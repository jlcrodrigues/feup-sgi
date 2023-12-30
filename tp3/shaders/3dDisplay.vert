varying vec2 vUv;
varying vec3 vNormal;

uniform sampler2D uSampler;
uniform sampler2D uSamplerGray;

void main() {
    vNormal = normal;
    vUv = uv;

    vec3 modifiedPosition = position + normal * abs(texture2D(uSamplerGray, uv).b);

    vec4 modelViewPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}
