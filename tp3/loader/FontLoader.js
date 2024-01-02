import * as THREE from 'three'

class FontLoader{
    constructor(onLoad){
        this.fontTexture = new THREE.TextureLoader().load("assets/fonts/very_nice_font.png",onLoad);

        const parser = new DOMParser();

        this.xmlDoc = parser.parseFromString('<?xml version="1.0" encoding="UTF-8"?><font><info face="KenVectorFuture2-Regular" size="72" bold="0" italic="0" charset="" unicode="1" stretchH="100" smooth="1" aa="1" padding="1,1,1,1" spacing="1,1"/>        <common lineHeight="72" base="63" scaleW="496" scaleH="498" pages="1" packed="0"/>        <pages><page id="0" file="very_nice_font.png"/></pages><chars count="91">        <char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="18" page="0" chnl="15"/><!--   -->        <char id="33" x="437" y="316" width="19" height="55" xoffset="15" yoffset="15" xadvance="42" page="0" chnl="15"/><!-- ! -->        <char id="34" x="457" y="56" width="37" height="28" xoffset="-3" yoffset="15" xadvance="42" page="0" chnl="15"/><!-- " -->        <char id="35" x="242" y="336" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- # -->        <char id="36" x="242" y="392" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- $ -->        <char id="37" x="410" y="56" width="46" height="55" xoffset="-3" yoffset="15" xadvance="51" page="0" chnl="15"/><!-- % -->        <char id="38" x="298" y="0" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- & -->        <char id="39" x="410" y="298" width="19" height="28" xoffset="-3" yoffset="15" xadvance="24" page="0" chnl="15"/><!-- \' -->        <char id="40" x="457" y="401" width="26" height="55" xoffset="-3" yoffset="15" xadvance="33" page="0" chnl="15"/><!-- ( -->        <char id="41" x="410" y="195" width="26" height="55" xoffset="-3" yoffset="15" xadvance="33" page="0" chnl="15"/><!-- ) -->        <char id="42" x="457" y="85" width="35" height="35" xoffset="-2" yoffset="16" xadvance="42" page="0" chnl="15"/><!-- * -->        <char id="43" x="242" y="224" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- + -->        <char id="44" x="457" y="457" width="19" height="28" xoffset="-3" yoffset="51" xadvance="24" page="0" chnl="15"/><!-- , -->        <char id="45" x="354" y="461" width="55" height="19" xoffset="-3" yoffset="33" xadvance="60" page="0" chnl="15"/><!-- - -->        <char id="46" x="410" y="327" width="19" height="19" xoffset="-3" yoffset="51" xadvance="24" page="0" chnl="15"/><!-- . -->        <char id="47" x="457" y="0" width="39" height="55" xoffset="-3" yoffset="15" xadvance="33" page="0" chnl="15"/><!-- / -->        <char id="48" x="0" y="271" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 0 -->        <char id="49" x="457" y="233" width="28" height="55" xoffset="-3" yoffset="15" xadvance="33" page="0" chnl="15"/><!-- 1 -->        <char id="50" x="0" y="327" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 2 -->        <char id="51" x="0" y="383" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 3 -->        <char id="52" x="0" y="439" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 4 -->        <char id="53" x="74" y="0" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 5        -->        <char id="54" x="74" y="56" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 6 -->        <char id="55" x="74" y="112" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 7 -->        <char id="56" x="74" y="168" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 8 -->        <char id="57" x="74" y="224" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- 9 -->        <char id="58" x="437" y="372" width="19" height="55" xoffset="-3" yoffset="15" xadvance="24" page="0" chnl="15"/><!-- : -->        <char id="59" x="437" y="195" width="19" height="64" xoffset="-3" yoffset="15" xadvance="24" page="0" chnl="15"/><!-- ; -->        <char id="61" x="354" y="423" width="55" height="37" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- = -->        <char id="63" x="242" y="168" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- ? -->        <char id="64" x="242" y="280" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- @         -->     <char id="65" x="74" y="280" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- A        -->        <char id="66" x="74" y="336" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- B -->        <char id="67" x="74" y="392" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- C -->        <char id="68" x="130" y="0" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- D -->        <char id="69" x="130" y="56" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- E -->        <char id="70" x="130" y="112" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- F -->        <char id="71" x="130" y="168" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- G -->        <char id="72" x="130" y="224" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- H -->        <char id="73" x="437" y="260" width="19" height="55" xoffset="-3" yoffset="15" xadvance="24" page="0" chnl="15"/><!-- I -->        <char id="74" x="410" y="0" width="46" height="55" xoffset="-3" yoffset="15" xadvance="51" page="0" chnl="15"/><!-- J -->        <char id="75" x="130" y="280" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- K -->        <char id="76" x="130" y="336" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- L -->        <char id="77" x="0" y="65" width="73" height="55" xoffset="-3" yoffset="15" xadvance="78" page="0" chnl="15"/><!-- M        -->        <char id="78" x="130" y="392" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- N -->        <char id="79" x="186" y="0" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- O -->        <char id="80" x="186" y="56" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- P -->        <char id="81" x="186" y="112" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- Q -->        <char id="82" x="186" y="168" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- R -->        <char id="83" x="186" y="224" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- S -->        <char id="84" x="186" y="280" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- T -->        <char id="85" x="186" y="336" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- U -->        <char id="86" x="186" y="392" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- V -->        <char id="87" x="0" y="121" width="73" height="55" xoffset="-3" yoffset="15" xadvance="78" page="0" chnl="15"/><!-- W -->        <char id="88" x="242" y="0" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- X -->        <char id="89" x="242" y="56" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- Y -->        <char id="90" x="242" y="112" width="55" height="55" xoffset="-3" yoffset="15" xadvance="60" page="0" chnl="15"/><!-- Z -->        <char id="91" x="457" y="289" width="28" height="55" xoffset="-3" yoffset="15" xadvance="33" page="0" chnl="15"/><!-- [ -->        <char id="93" x="457" y="345" width="28" height="55" xoffset="-3" yoffset="15" xadvance="33" page="0" chnl="15"/><!-- ] -->        <char id="94" x="410" y="159" width="46" height="35" xoffset="-3" yoffset="15" xadvance="42" page="0" chnl="15"/><!-- ^ -->        <char id="95" x="298" y="479" width="55" height="19" xoffset="-3" yoffset="51" xadvance="60" page="0" chnl="15"/><!-- _ -->        <char id="97" x="74" y="448" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- a -->        <char id="98" x="130" y="448" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- b -->        <char id="99" x="186" y="448" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- c -->        <char id="100" x="242" y="448" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- d -->        <char id="101" x="298" y="56" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- e -->        <char id="102" x="298" y="103" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- f -->        <char id="103" x="298" y="150" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- g -->        <char id="104" x="298" y="197" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- h -->        <char id="105" x="410" y="251" width="19" height="46" xoffset="-3" yoffset="24" xadvance="24" page="0" chnl="15"/><!-- i -->        <char id="106" x="410" y="112" width="46" height="46" xoffset="-3" yoffset="24" xadvance="51" page="0" chnl="15"/><!-- j -->        <char id="107" x="298" y="244" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- k -->        <char id="108" x="298" y="291" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- l -->        <char id="109" x="0" y="177" width="73" height="46" xoffset="-3" yoffset="24" xadvance="78" page="0" chnl="15"/><!-- m -->        <char id="110" x="298" y="338" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- n -->        <char id="111" x="298" y="385" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- o -->        <char id="112" x="298" y="432" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- p -->        <char id="113" x="354" y="0" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- q -->        <char id="114" x="354" y="47" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- r -->        <char id="115" x="354" y="94" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- s -->        <char id="116" x="354" y="141" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- t -->        <char id="117" x="354" y="188" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- u -->        <char id="118" x="354" y="235" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- v -->        <char id="119" x="0" y="224" width="73" height="46" xoffset="-3" yoffset="24" xadvance="78" page="0" chnl="15"/><!-- w -->        <char id="120" x="354" y="282" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- x -->        <char id="121" x="354" y="329" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- y -->        <char id="122" x="354" y="376" width="55" height="46" xoffset="-3" yoffset="24" xadvance="60" page="0" chnl="15"/><!-- z -->        <char id="123" x="457" y="177" width="32" height="55" xoffset="2" yoffset="15" xadvance="42" page="0" chnl="15"/><!-- { -->        <char id="124" x="437" y="428" width="19" height="55" xoffset="-3" yoffset="15" xadvance="24" page="0" chnl="15"/><!-- | -->        <char id="125" x="457" y="121" width="33" height="55" xoffset="-3" yoffset="15" xadvance="42" page="0" chnl="15"/><!-- } -->        <char id="8470" x="0" y="0" width="73" height="64" xoffset="-1" yoffset="16" xadvance="69" page="0" chnl="15"/><!-- № -->        </chars></font>', "text/xml");
       
        this.scaleW = this.xmlDoc.firstChild.lastChild.previousSibling.previousSibling.previousSibling.getAttribute('scaleW');
        this.scaleH = this.xmlDoc.firstChild.lastChild.previousSibling.previousSibling.previousSibling.getAttribute('scaleH');
        
        const xmlChars = this.xmlDoc.firstChild.lastChild.childNodes
        this.chars = []

        for (let index = 0; index < xmlChars.length; index++) {
            if(xmlChars[index].nodeName == 'char') 
                this.chars.push(xmlChars[index])
        }

        this.charOffset = 0
    }

    getMesh(charData){

        const x = parseInt(charData.getAttribute('x'));
        const y = parseInt(charData.getAttribute('y'));
        const width = parseInt(charData.getAttribute('width'));
        const height = parseInt(charData.getAttribute('height'));
        const xoffset = parseInt(charData.getAttribute('xoffset'));
        const xadvance = parseInt(charData.getAttribute('xadvance'));

        // Create geometry and material for each character
        const geometry = new THREE.PlaneGeometry(width/this.scaleW, height/this.scaleH);

        // Create a custom shader material
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D map;
                uniform vec2 repeat;
                uniform vec2 offset;
                varying vec2 vUv;
                void main() {
                    vec2 uv = vec2(vUv.x * repeat.x + offset.x, vUv.y * repeat.y + offset.y);
                    gl_FragColor = texture2D(map, uv);
                }
            `,
            uniforms: {
                map: { value: this.fontTexture },
                repeat: { value: new THREE.Vector2(width / this.scaleW, height / this.scaleH) },
                offset: { value: new THREE.Vector2(x / this.scaleW, 1 - (y + height) / this.scaleH) },
            },
            transparent: true,
        });

        // Create mesh for the current character
        const charMesh = new THREE.Mesh(geometry, material);
        charMesh.position.set(this.charOffset,0,0.5);
        // console.log("char=",charData.getAttribute("id"),"position=",this.charOffset)
        
        // Update the offset for the next character
        this.charOffset += 55 / this.scaleW;
        // console.log("nextPos=", this.charOffset, width/this.scaleW)

        return charMesh
    }

    getMeshArray(string) {
        this.charOffset = 0;
   
        const textMeshArray = []; 

        for (let i = 0; i < string.length; i++) {
          const charCode = string.charCodeAt(i);
          const charData = this.chars.find(char => parseInt(char.getAttribute('id')) === charCode);
    
            if (charData) {
                const charMesh = this.getMesh(charData)

                // Add the mesh to the array
                textMeshArray.push(charMesh);
            }
        }
        return [textMeshArray,(string.length/2)*60/this.scaleW];
    }
}

export { FontLoader }