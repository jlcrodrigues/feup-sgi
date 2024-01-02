varying vec3 vColor;
varying vec3 color;
varying vec3 instanceColor;

uniform float time;

void main(){
    vColor = color;

    float frequency=2.;
    float pulse=1.+.2*sin(time*frequency);
    float scale=pulse;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position*scale,1.);
}
