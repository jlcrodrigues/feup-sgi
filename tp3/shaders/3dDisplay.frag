varying vec2 vUv;
uniform sampler2D uSampler;

uniform sampler2D uSamplerGray;

void main() {
	gl_FragColor =  texture2D(uSampler, vUv);
}