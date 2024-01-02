#include <packing>

varying vec2 vUv;
varying vec3 vNormal;
uniform sampler2D uSampler;
uniform sampler2D uSamplerGray;
uniform float cameraNear;
uniform float cameraFar;


float readDepth( sampler2D depthSampler, vec2 coord ) {
	float fragCoordZ = texture2D( depthSampler, coord ).x;
	float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
	return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
}

void main() {
    vNormal = normal;
    vUv = uv;

    //float depth = abs(texture2D(uSamplerGray, uv).r) * 1.0;
	float depth = readDepth( uSamplerGray, vUv );
    depth = 1.0 - clamp(depth, 0.0, 1.0);
    vec3 modifiedPosition = position + normal * depth;

    vec4 modelViewPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}
