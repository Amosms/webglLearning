/*
 * @Date: 2022-11-15 17:36:58
 * @LastEditors: changgeee
 * @LastEditTime: 2022-11-28 14:04:03
 * @FilePath: \ipems-r\src\views\scene\transformControls\libs\OutlinePass.js
 */

import { OutlinePass } from "./OutlinePass";


class MyOutlinePass extends OutlinePass {

    constructor(resolution, scene, camera, selectedObjects) {
        super(resolution, scene, camera, selectedObjects);
    }

    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        if (this.selectedObjects.length > 0) {

            renderer.getClearColor(this._oldClearColor);
            this.oldClearAlpha = renderer.getClearAlpha();
            const oldAutoClear = renderer.autoClear;

            renderer.autoClear = false;

            if (maskActive) renderer.state.buffers.stencil.setTest(false);

            renderer.setClearColor(0xffffff, 1);

            // Make selected objects invisible
            this.changeVisibilityOfSelectedObjects(false);

            const currentBackground = this.renderScene.background;
            this.renderScene.background = null;

            // 1. Draw Non Selected objects in the depth buffer
            this.renderScene.overrideMaterial = this.depthMaterial;
            renderer.setRenderTarget(this.renderTargetDepthBuffer);
            renderer.clear();
            renderer.render(this.renderScene, this.renderCamera);

            // Make selected objects visible
            this.changeVisibilityOfSelectedObjects(true);
            this._visibilityCache.clear();

            // Update Texture Matrix for Depth compare
            this.updateTextureMatrix();

            // Make non selected objects invisible, and draw only the selected objects, by comparing the depth buffer of non selected objects
            this.changeVisibilityOfNonSelectedObjects(false);
            this.renderScene.overrideMaterial = this.prepareMaskMaterial;
            this.prepareMaskMaterial.uniforms['cameraNearFar'].value.set(this.renderCamera.near, this.renderCamera.far);
            this.prepareMaskMaterial.uniforms['depthTexture'].value = this.renderTargetDepthBuffer.texture;
            this.prepareMaskMaterial.uniforms['textureMatrix'].value = this.textureMatrix;
            renderer.setRenderTarget(this.renderTargetMaskBuffer);
            renderer.clear();
            renderer.render(this.renderScene, this.renderCamera);
            this.renderScene.overrideMaterial = null;
            this.changeVisibilityOfNonSelectedObjects(true);
            this._visibilityCache.clear();
            this.renderScene.background = currentBackground;

            // 2. Downsample to Half resolution
            this.fsQuad.material = this.materialCopy;
            this.copyUniforms['tDiffuse'].value = this.renderTargetMaskBuffer.texture;
            renderer.setRenderTarget(this.renderTargetMaskDownSampleBuffer);
            renderer.clear();
            this.fsQuad.render(renderer);

            this.tempPulseColor1.copy(this.visibleEdgeColor);
            this.tempPulseColor2.copy(this.hiddenEdgeColor);

            if (this.pulsePeriod > 0) {

                const scalar = (1 + 0.25) / 2 + Math.cos(performance.now() * 0.01 / this.pulsePeriod) * (1.0 - 0.25) / 2;
                this.tempPulseColor1.multiplyScalar(scalar);
                this.tempPulseColor2.multiplyScalar(scalar);

            }

            // 3. Apply Edge Detection Pass
            this.fsQuad.material = this.edgeDetectionMaterial;
            this.edgeDetectionMaterial.uniforms['maskTexture'].value = this.renderTargetMaskDownSampleBuffer.texture;
            this.edgeDetectionMaterial.uniforms['texSize'].value.set(this.renderTargetMaskDownSampleBuffer.width, this.renderTargetMaskDownSampleBuffer.height);
            this.edgeDetectionMaterial.uniforms['visibleEdgeColor'].value = this.tempPulseColor1;
            this.edgeDetectionMaterial.uniforms['hiddenEdgeColor'].value = this.tempPulseColor2;
            renderer.setRenderTarget(this.renderTargetEdgeBuffer1);
            renderer.clear();
            this.fsQuad.render(renderer);

            // 4. Apply Blur on Half res
            this.fsQuad.material = this.separableBlurMaterial1;
            this.separableBlurMaterial1.uniforms['colorTexture'].value = this.renderTargetEdgeBuffer1.texture;
            this.separableBlurMaterial1.uniforms['direction'].value = OutlinePass.BlurDirectionX;
            this.separableBlurMaterial1.uniforms['kernelRadius'].value = this.edgeThickness;
            renderer.setRenderTarget(this.renderTargetBlurBuffer1);
            renderer.clear();
            this.fsQuad.render(renderer);
            this.separableBlurMaterial1.uniforms['colorTexture'].value = this.renderTargetBlurBuffer1.texture;
            this.separableBlurMaterial1.uniforms['direction'].value = OutlinePass.BlurDirectionY;
            renderer.setRenderTarget(this.renderTargetEdgeBuffer1);
            renderer.clear();
            this.fsQuad.render(renderer);

            // Apply Blur on quarter res
            this.fsQuad.material = this.separableBlurMaterial2;
            this.separableBlurMaterial2.uniforms['colorTexture'].value = this.renderTargetEdgeBuffer1.texture;
            this.separableBlurMaterial2.uniforms['direction'].value = OutlinePass.BlurDirectionX;
            renderer.setRenderTarget(this.renderTargetBlurBuffer2);
            renderer.clear();
            this.fsQuad.render(renderer);
            this.separableBlurMaterial2.uniforms['colorTexture'].value = this.renderTargetBlurBuffer2.texture;
            this.separableBlurMaterial2.uniforms['direction'].value = OutlinePass.BlurDirectionY;
            renderer.setRenderTarget(this.renderTargetEdgeBuffer2);
            renderer.clear();
            this.fsQuad.render(renderer);

            // Blend it additively over the input texture
            this.fsQuad.material = this.overlayMaterial;
            this.overlayMaterial.uniforms['maskTexture'].value = this.renderTargetMaskBuffer.texture;
            this.overlayMaterial.uniforms['edgeTexture1'].value = this.renderTargetEdgeBuffer1.texture;
            this.overlayMaterial.uniforms['edgeTexture2'].value = this.renderTargetEdgeBuffer2.texture;
            this.overlayMaterial.uniforms['patternTexture'].value = this.patternTexture;
            this.overlayMaterial.uniforms['edgeStrength'].value = this.edgeStrength;
            this.overlayMaterial.uniforms['edgeGlow'].value = this.edgeGlow;
            this.overlayMaterial.uniforms['usePatternTexture'].value = this.usePatternTexture;


            if (maskActive) renderer.state.buffers.stencil.setTest(true);

            renderer.setRenderTarget(readBuffer);
            this.fsQuad.render(renderer);

            renderer.setClearColor(this._oldClearColor, this.oldClearAlpha);
            renderer.autoClear = oldAutoClear;

        }

        if (this.renderToScreen) {
            this.fsQuad.material = this.materialCopy;
            //关键是下面这句
            // readBuffer.texture.encoding = renderer.outputEncoding;
            this.copyUniforms['tDiffuse'].value = readBuffer.texture;
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);

        }
    }

}
export { MyOutlinePass };
