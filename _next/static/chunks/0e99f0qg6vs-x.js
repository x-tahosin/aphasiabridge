(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,92954,e=>{"use strict";var t=e.i(69630),i=e.i(46978),a=e.i(98416),r=e.i(46340),s=e.i(76507),n=e.i(86609),o=new n.dd;o.setAttribute("position",new n.Zc(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));var l=class extends n.de{constructor(e){super({...e,depthTest:!1,depthWrite:!1,glslVersion:n.nc,vertexShader:"\n				precision highp float;\n				in vec3 position;\n				void main() {\n					gl_Position = vec4(position, 1);\n				}\n			"})}customProgramCacheKey(){return""}};function h(){return{shapeInput:()=>"\n			const float posRowCoord = 0.1;  \n			const float quatRowCoord = 0.3;  \n			const float param1RowCoord = 0.5;\n			const float param2RowCoord = 0.7;\n			const float colorRowCoord = 0.9; \n			uniform sampler2D shapesDataTexture;\n			vec4 shapePos(float iin) { \n				vec4 r = texture(shapesDataTexture, vec2(iin, posRowCoord));\n				return r;\n			}\n			vec4 shapeQuat(float iin) {\n				vec4 r = texture(shapesDataTexture, vec2(iin, quatRowCoord));\n				return r;\n			}\n			vec4 shapeParams1(float iin) {\n				vec4 r = texture(shapesDataTexture, vec2(iin, param1RowCoord));\n				return r;\n			}\n			vec4 shapeParams2(float iin) {\n				vec4 r = texture(shapesDataTexture, vec2(iin, param2RowCoord));\n				return r;\n			}\n			vec4 shapeColor(float iin) {\n				vec4 r = texture(shapesDataTexture, vec2(iin, colorRowCoord));\n				return r;\n			}\n		",getxyzi:"\n			// this code must complement lookup\n			float xi = mod(gl_FragCoord.x - 0.5, VOXEL_RESOLUTION);\n			float yi = mod(gl_FragCoord.y - 0.5, VOXEL_RESOLUTION);\n			float zi = floor((gl_FragCoord.x - 0.5) * INV_VOXEL_RESOLUTION) + floor((gl_FragCoord.y - 0.5) * INV_VOXEL_RESOLUTION) * Z_LAYERS_PER_ROW;\n		",lookup:"\n			uniform sampler2D potentialPassTexture;\n			uniform sampler2D voxelPassTexture; \n			\n			\n			\n			vec4 look(float xi, float yi, float zi, sampler2D rt) {\n				vec2 uv = vec2(\n					mod(zi, Z_LAYERS_PER_ROW) + (xi + 0.5) / VOXEL_RESOLUTION,\n					floor(zi / Z_LAYERS_PER_ROW) + (yi + 0.5) / VOXEL_RESOLUTION\n				); \n				uv /= Z_LAYERS_PER_ROW;\n				return texture(rt, uv);\n			}\n		",getpart:"\n			float getpart(inout float a, float b) {\n				float t = floor(a/b);\n				float r = a - t*b;\n				a = t;\n				return r;\n			}\n		",triTable:new Float32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,1,1,8,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,0,10,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,2,9,9,2,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,2,8,10,2,8,9,10,-1,-1,-1,-1,-1,-1,-1,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,11,0,0,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,11,3,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,11,1,11,9,1,11,8,9,-1,-1,-1,-1,-1,-1,-1,1,10,3,3,10,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,10,0,10,8,0,10,11,8,-1,-1,-1,-1,-1,-1,-1,0,9,3,9,11,3,9,10,11,-1,-1,-1,-1,-1,-1,-1,10,8,9,11,8,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,4,4,3,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,1,0,7,4,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,1,4,1,7,4,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,2,1,7,4,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,4,3,4,0,3,10,2,1,-1,-1,-1,-1,-1,-1,-1,10,2,9,2,0,9,7,4,8,-1,-1,-1,-1,-1,-1,-1,9,10,2,7,9,2,3,7,2,4,9,7,-1,-1,-1,-1,7,4,8,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,4,11,4,2,11,4,0,2,-1,-1,-1,-1,-1,-1,-1,1,0,9,7,4,8,11,3,2,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,9,2,11,9,1,2,9,-1,-1,-1,-1,1,10,3,10,11,3,4,8,7,-1,-1,-1,-1,-1,-1,-1,10,11,1,11,4,1,4,0,1,4,11,7,-1,-1,-1,-1,8,7,4,11,0,9,10,11,9,3,0,11,-1,-1,-1,-1,11,7,4,9,11,4,10,11,9,-1,-1,-1,-1,-1,-1,-1,4,5,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,5,9,3,8,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,5,0,0,5,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,5,8,5,3,8,5,1,3,-1,-1,-1,-1,-1,-1,-1,10,2,1,4,5,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,0,3,10,2,1,5,9,4,-1,-1,-1,-1,-1,-1,-1,10,2,5,2,4,5,2,0,4,-1,-1,-1,-1,-1,-1,-1,5,10,2,5,2,3,4,5,3,8,4,3,-1,-1,-1,-1,4,5,9,11,3,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,11,0,11,8,0,5,9,4,-1,-1,-1,-1,-1,-1,-1,4,5,0,5,1,0,11,3,2,-1,-1,-1,-1,-1,-1,-1,5,1,2,8,5,2,11,8,2,5,8,4,-1,-1,-1,-1,11,3,10,3,1,10,4,5,9,-1,-1,-1,-1,-1,-1,-1,5,9,4,1,8,0,1,10,8,10,11,8,-1,-1,-1,-1,0,4,5,11,0,5,10,11,5,3,0,11,-1,-1,-1,-1,8,4,5,10,8,5,11,8,10,-1,-1,-1,-1,-1,-1,-1,8,7,9,9,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,9,3,5,9,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,7,0,7,1,0,7,5,1,-1,-1,-1,-1,-1,-1,-1,3,5,1,7,5,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,7,9,7,5,9,2,1,10,-1,-1,-1,-1,-1,-1,-1,2,1,10,0,5,9,0,3,5,3,7,5,-1,-1,-1,-1,2,0,8,5,2,8,7,5,8,2,5,10,-1,-1,-1,-1,5,10,2,3,5,2,7,5,3,-1,-1,-1,-1,-1,-1,-1,5,9,7,9,8,7,2,11,3,-1,-1,-1,-1,-1,-1,-1,7,5,9,2,7,9,0,2,9,11,7,2,-1,-1,-1,-1,11,3,2,8,1,0,8,7,1,7,5,1,-1,-1,-1,-1,1,2,11,7,1,11,5,1,7,-1,-1,-1,-1,-1,-1,-1,8,5,9,7,5,8,3,1,10,11,3,10,-1,-1,-1,-1,0,7,5,9,0,5,0,11,7,10,0,1,0,10,11,-1,0,10,11,3,0,11,0,5,10,7,0,8,0,7,5,-1,5,10,11,5,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,0,6,10,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,0,9,6,10,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,1,8,9,1,6,10,5,-1,-1,-1,-1,-1,-1,-1,5,6,1,1,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,6,1,6,2,1,8,0,3,-1,-1,-1,-1,-1,-1,-1,5,6,9,6,0,9,6,2,0,-1,-1,-1,-1,-1,-1,-1,8,9,5,2,8,5,6,2,5,8,2,3,-1,-1,-1,-1,11,3,2,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,0,11,0,2,11,5,6,10,-1,-1,-1,-1,-1,-1,-1,9,1,0,11,3,2,6,10,5,-1,-1,-1,-1,-1,-1,-1,6,10,5,2,9,1,2,11,9,11,8,9,-1,-1,-1,-1,11,3,6,3,5,6,3,1,5,-1,-1,-1,-1,-1,-1,-1,11,8,0,5,11,0,1,5,0,6,11,5,-1,-1,-1,-1,6,11,3,6,3,0,5,6,0,9,5,0,-1,-1,-1,-1,9,5,6,11,9,6,8,9,11,-1,-1,-1,-1,-1,-1,-1,6,10,5,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,4,3,7,4,10,5,6,-1,-1,-1,-1,-1,-1,-1,0,9,1,6,10,5,7,4,8,-1,-1,-1,-1,-1,-1,-1,5,6,10,7,9,1,3,7,1,4,9,7,-1,-1,-1,-1,2,1,6,1,5,6,8,7,4,-1,-1,-1,-1,-1,-1,-1,5,2,1,6,2,5,4,0,3,7,4,3,-1,-1,-1,-1,7,4,8,5,0,9,5,6,0,6,2,0,-1,-1,-1,-1,9,3,7,4,9,7,9,2,3,6,9,5,9,6,2,-1,2,11,3,4,8,7,5,6,10,-1,-1,-1,-1,-1,-1,-1,6,10,5,2,7,4,0,2,4,11,7,2,-1,-1,-1,-1,9,1,0,8,7,4,11,3,2,6,10,5,-1,-1,-1,-1,1,2,9,2,11,9,11,4,9,4,11,7,6,10,5,-1,7,4,8,5,11,3,1,5,3,6,11,5,-1,-1,-1,-1,11,1,5,6,11,5,11,0,1,4,11,7,11,4,0,-1,9,5,0,5,6,0,6,3,0,3,6,11,7,4,8,-1,9,5,6,11,9,6,9,7,4,9,11,7,-1,-1,-1,-1,9,4,10,10,4,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,10,4,10,9,4,3,8,0,-1,-1,-1,-1,-1,-1,-1,1,0,10,0,6,10,0,4,6,-1,-1,-1,-1,-1,-1,-1,1,3,8,6,1,8,4,6,8,10,1,6,-1,-1,-1,-1,9,4,1,4,2,1,4,6,2,-1,-1,-1,-1,-1,-1,-1,8,0,3,9,2,1,9,4,2,4,6,2,-1,-1,-1,-1,4,2,0,6,2,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,4,2,8,6,2,4,-1,-1,-1,-1,-1,-1,-1,9,4,10,4,6,10,3,2,11,-1,-1,-1,-1,-1,-1,-1,2,8,0,11,8,2,10,9,4,6,10,4,-1,-1,-1,-1,2,11,3,6,1,0,4,6,0,10,1,6,-1,-1,-1,-1,1,4,6,10,1,6,1,8,4,11,1,2,1,11,8,-1,4,6,9,6,3,9,3,1,9,3,6,11,-1,-1,-1,-1,1,11,8,0,1,8,1,6,11,4,1,9,1,4,6,-1,6,11,3,0,6,3,4,6,0,-1,-1,-1,-1,-1,-1,-1,8,4,6,8,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,10,7,10,8,7,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,7,0,7,10,0,10,9,0,10,7,6,-1,-1,-1,-1,7,6,10,7,10,1,8,7,1,0,8,1,-1,-1,-1,-1,7,6,10,1,7,10,3,7,1,-1,-1,-1,-1,-1,-1,-1,6,2,1,8,6,1,9,8,1,7,6,8,-1,-1,-1,-1,9,6,2,1,9,2,9,7,6,3,9,0,9,3,7,-1,0,8,7,6,0,7,2,0,6,-1,-1,-1,-1,-1,-1,-1,2,3,7,2,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,3,2,8,6,10,9,8,10,7,6,8,-1,-1,-1,-1,7,0,2,11,7,2,7,9,0,10,7,6,7,10,9,-1,0,8,1,8,7,1,7,10,1,10,7,6,11,3,2,-1,1,2,11,7,1,11,1,6,10,1,7,6,-1,-1,-1,-1,6,9,8,7,6,8,6,1,9,3,6,11,6,3,1,-1,1,9,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,6,0,7,0,11,3,0,6,11,-1,-1,-1,-1,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,0,3,6,7,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,1,0,6,7,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,1,8,1,3,8,6,7,11,-1,-1,-1,-1,-1,-1,-1,2,1,10,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,2,1,8,0,3,7,11,6,-1,-1,-1,-1,-1,-1,-1,0,9,2,9,10,2,7,11,6,-1,-1,-1,-1,-1,-1,-1,7,11,6,3,10,2,3,8,10,8,9,10,-1,-1,-1,-1,3,2,7,7,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,0,7,0,6,7,0,2,6,-1,-1,-1,-1,-1,-1,-1,6,7,2,7,3,2,9,1,0,-1,-1,-1,-1,-1,-1,-1,2,6,1,6,8,1,8,9,1,6,7,8,-1,-1,-1,-1,6,7,10,7,1,10,7,3,1,-1,-1,-1,-1,-1,-1,-1,6,7,10,10,7,1,7,8,1,8,0,1,-1,-1,-1,-1,7,3,0,10,7,0,9,10,0,7,10,6,-1,-1,-1,-1,10,6,7,8,10,7,9,10,8,-1,-1,-1,-1,-1,-1,-1,4,8,6,6,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,6,3,6,0,3,6,4,0,-1,-1,-1,-1,-1,-1,-1,11,6,8,6,4,8,1,0,9,-1,-1,-1,-1,-1,-1,-1,6,4,9,3,6,9,1,3,9,6,3,11,-1,-1,-1,-1,4,8,6,8,11,6,1,10,2,-1,-1,-1,-1,-1,-1,-1,10,2,1,11,0,3,11,6,0,6,4,0,-1,-1,-1,-1,8,11,4,11,6,4,9,2,0,9,10,2,-1,-1,-1,-1,3,9,10,2,3,10,3,4,9,6,3,11,3,6,4,-1,3,2,8,2,4,8,2,6,4,-1,-1,-1,-1,-1,-1,-1,2,4,0,2,6,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,4,3,2,6,4,2,8,3,4,-1,-1,-1,-1,4,9,1,2,4,1,6,4,2,-1,-1,-1,-1,-1,-1,-1,3,1,8,1,6,8,6,4,8,1,10,6,-1,-1,-1,-1,0,1,10,6,0,10,4,0,6,-1,-1,-1,-1,-1,-1,-1,3,6,4,8,3,4,3,10,6,9,3,0,3,9,10,-1,4,9,10,4,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,9,4,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,8,0,5,9,4,6,7,11,-1,-1,-1,-1,-1,-1,-1,1,0,5,0,4,5,11,6,7,-1,-1,-1,-1,-1,-1,-1,6,7,11,4,3,8,4,5,3,5,1,3,-1,-1,-1,-1,4,5,9,2,1,10,11,6,7,-1,-1,-1,-1,-1,-1,-1,7,11,6,10,2,1,3,8,0,5,9,4,-1,-1,-1,-1,11,6,7,10,4,5,10,2,4,2,0,4,-1,-1,-1,-1,8,4,3,4,5,3,5,2,3,2,5,10,6,7,11,-1,3,2,7,2,6,7,9,4,5,-1,-1,-1,-1,-1,-1,-1,4,5,9,6,8,0,2,6,0,7,8,6,-1,-1,-1,-1,2,6,3,6,7,3,0,5,1,0,4,5,-1,-1,-1,-1,8,2,6,7,8,6,8,1,2,5,8,4,8,5,1,-1,4,5,9,6,1,10,6,7,1,7,3,1,-1,-1,-1,-1,10,6,1,6,7,1,7,0,1,0,7,8,4,5,9,-1,10,0,4,5,10,4,10,3,0,7,10,6,10,7,3,-1,10,6,7,8,10,7,10,4,5,10,8,4,-1,-1,-1,-1,5,9,6,9,11,6,9,8,11,-1,-1,-1,-1,-1,-1,-1,11,6,3,3,6,0,6,5,0,5,9,0,-1,-1,-1,-1,8,11,0,11,5,0,5,1,0,11,6,5,-1,-1,-1,-1,3,11,6,5,3,6,1,3,5,-1,-1,-1,-1,-1,-1,-1,10,2,1,11,5,9,8,11,9,6,5,11,-1,-1,-1,-1,3,11,0,11,6,0,6,9,0,9,6,5,10,2,1,-1,5,8,11,6,5,11,5,0,8,2,5,10,5,2,0,-1,3,11,6,5,3,6,3,10,2,3,5,10,-1,-1,-1,-1,9,8,5,8,2,5,2,6,5,2,8,3,-1,-1,-1,-1,6,5,9,0,6,9,2,6,0,-1,-1,-1,-1,-1,-1,-1,8,5,1,0,8,1,8,6,5,2,8,3,8,2,6,-1,6,5,1,6,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,3,1,10,6,1,6,8,3,9,6,5,6,9,8,-1,0,1,10,6,0,10,0,5,9,0,6,5,-1,-1,-1,-1,8,3,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,5,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,11,11,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,11,5,7,11,0,3,8,-1,-1,-1,-1,-1,-1,-1,7,11,5,11,10,5,0,9,1,-1,-1,-1,-1,-1,-1,-1,5,7,10,7,11,10,1,8,9,1,3,8,-1,-1,-1,-1,2,1,11,1,7,11,1,5,7,-1,-1,-1,-1,-1,-1,-1,3,8,0,7,2,1,5,7,1,11,2,7,-1,-1,-1,-1,5,7,9,7,2,9,2,0,9,7,11,2,-1,-1,-1,-1,2,5,7,11,2,7,2,9,5,8,2,3,2,8,9,-1,10,5,2,5,3,2,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,2,8,2,5,8,5,7,8,5,2,10,-1,-1,-1,-1,1,0,9,3,10,5,7,3,5,2,10,3,-1,-1,-1,-1,2,8,9,1,2,9,2,7,8,5,2,10,2,5,7,-1,5,3,1,5,7,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,1,7,0,5,7,1,-1,-1,-1,-1,-1,-1,-1,3,0,9,5,3,9,7,3,5,-1,-1,-1,-1,-1,-1,-1,7,8,9,7,9,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,5,8,10,5,8,11,10,-1,-1,-1,-1,-1,-1,-1,4,0,5,0,11,5,11,10,5,0,3,11,-1,-1,-1,-1,9,1,0,10,4,8,11,10,8,5,4,10,-1,-1,-1,-1,4,11,10,5,4,10,4,3,11,1,4,9,4,1,3,-1,1,5,2,5,8,2,8,11,2,8,5,4,-1,-1,-1,-1,11,4,0,3,11,0,11,5,4,1,11,2,11,1,5,-1,5,2,0,9,5,0,5,11,2,8,5,4,5,8,11,-1,5,4,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,2,2,5,3,5,4,3,4,8,3,-1,-1,-1,-1,2,10,5,4,2,5,0,2,4,-1,-1,-1,-1,-1,-1,-1,2,10,3,10,5,3,5,8,3,8,5,4,9,1,0,-1,2,10,5,4,2,5,2,9,1,2,4,9,-1,-1,-1,-1,5,4,8,3,5,8,1,5,3,-1,-1,-1,-1,-1,-1,-1,5,4,0,5,0,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,4,8,3,5,8,5,0,9,5,3,0,-1,-1,-1,-1,5,4,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,11,4,11,9,4,11,10,9,-1,-1,-1,-1,-1,-1,-1,3,8,0,7,9,4,7,11,9,11,10,9,-1,-1,-1,-1,11,10,1,4,11,1,0,4,1,11,4,7,-1,-1,-1,-1,4,1,3,8,4,3,4,10,1,11,4,7,4,11,10,-1,7,11,4,4,11,9,11,2,9,2,1,9,-1,-1,-1,-1,4,7,9,7,11,9,11,1,9,1,11,2,3,8,0,-1,4,7,11,2,4,11,0,4,2,-1,-1,-1,-1,-1,-1,-1,4,7,11,2,4,11,4,3,8,4,2,3,-1,-1,-1,-1,10,9,2,9,7,2,7,3,2,9,4,7,-1,-1,-1,-1,7,10,9,4,7,9,7,2,10,0,7,8,7,0,2,-1,10,7,3,2,10,3,10,4,7,0,10,1,10,0,4,-1,2,10,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,4,7,1,4,3,1,7,-1,-1,-1,-1,-1,-1,-1,1,9,4,7,1,4,1,8,0,1,7,8,-1,-1,-1,-1,3,0,4,3,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,10,9,8,11,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,3,11,9,3,10,9,11,-1,-1,-1,-1,-1,-1,-1,10,1,0,8,10,0,11,10,8,-1,-1,-1,-1,-1,-1,-1,10,1,3,10,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,2,1,9,11,1,8,11,9,-1,-1,-1,-1,-1,-1,-1,9,0,3,11,9,3,9,2,1,9,11,2,-1,-1,-1,-1,11,2,0,11,0,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,2,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,10,8,2,9,8,10,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,10,8,2,8,1,0,8,10,1,-1,-1,-1,-1,2,10,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),numTrisTable:new Float32Array([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,2,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,3,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,3,2,3,3,2,3,4,4,3,3,4,4,3,4,5,5,2,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,3,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,4,2,3,3,4,3,4,2,3,3,4,4,5,4,5,3,2,3,4,4,3,4,5,3,2,4,5,5,4,5,2,4,1,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,3,2,3,3,4,3,4,4,5,3,2,4,3,4,3,5,2,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,4,3,4,4,3,4,5,5,4,4,3,5,2,5,4,2,1,2,3,3,4,3,4,4,5,3,4,4,5,2,3,3,2,3,4,4,5,4,5,5,2,4,3,5,4,3,2,4,1,3,4,4,5,4,5,3,4,4,5,5,2,3,4,2,1,2,3,3,2,3,4,2,1,3,2,4,1,2,1,1,0])}}var d=new n.we,c=null,p=null,u=null;function f(){return u}var m=h(),v=!1,x=!0;try{let e=new URLSearchParams(window.location.search);v="0"===e.get("dbgsbstatic"),x="0"!==e.get("sb512")}catch{}function y(e){let t=e.getAttribute("position");return void 0===t?-1:1048576*(t.version??t.data?.version??0)+(t.count??0)%1048576}var g=class extends a.ia{constructor(e,t,i){super(e,t,i),this.data=t,this.isShapeBlendEntity=!0,this.needsRebuild=!0,this.customDepthMaterialNeedsUpdate=!1,this._prevShapeData=null,this._prevSpan=-1,this._reach=new Float32Array(96),this._prevReach=new Float32Array(96),this._fieldDirtyFull=!0,this._fieldDirtyMin=new n.Fc,this._fieldDirtyMax=new n.Fc,this._maxBlendK=0,this._meshSdfBaked=new Map,this._meshSdfWanted=new Map,this._passesRenderer=null,this._npart=-1,this.spatialn=1,this.drawRangeNeedsForceUpdate=!0,this._resolutionLevel=-1,this._authoredResolutionLevel=-1,this.ultraFieldResolution=0,this.resolution=64,this.spatialDivisions=25,this.zLayersPerRow=8,this.basePyramidSize=512,this.pyramidTexture1Width=341,this.pyramidTexture1Height=256,this.pyramidTexture2Width=170,this.pyramidTexture2Height=128,this.numLevels=9,this.pyramidLevelSizes=[1,2,4,8,16,32,64,128,256,512],this.bboxSize=0,this.bboxOffset=0,this.shapesDataTexture={value:void 0},this.spatialscene=new n.Vc,this.potentialPassScene=new n.Vc,this.voxelPassScene=new n.Vc,this._spatialPassRenderTargets=[],this._potentialPassRenderTargets=[],this._voxelPassRenderTargets=[],this._pyramidRenderTargets=[],this.geometry=new n.dd,this.geometry.drawRange.count=0,this.spatialPassUniforms={span:{value:-1},shapesDataTexture:this.shapesDataTexture,npart:{value:this.npart},spatialn:{value:this.spatialn}},this.spatialMesh=new n.ld(o,this.spatialPassMaterial()),this.spatialMesh.frustumCulled=!1,this.spatialscene.add(this.spatialMesh);let a=new n.nd(m.triTable,16,256,n.Ma,n.Aa);a.needsUpdate=!0;let r=new n.nd(m.numTrisTable,256,1,n.Ma,n.Aa);r.needsUpdate=!0,this.voxelPassUniforms={potentialPassTexture:{value:void 0},numTrisTable:{value:r}},this.voxelMesh=new n.ld(o,this.voxelPassMaterial()),this.voxelMesh.frustumCulled=!1,this.voxelPassScene.add(this.voxelMesh),this.potentialPassUniforms={shapesDataTexture:this.shapesDataTexture,spatialPassTexture:{value:void 0},npart:{value:this.npart},spatialn:{value:this.spatialn}},this.potentialMesh=new n.ld(o,this.potentialPassMaterial()),this.potentialMesh.frustumCulled=!1,this.potentialPassScene.add(this.potentialMesh),this.marchPassUniforms={triTable:{value:a},potentialPassTexture:{value:void 0},voxelPassTexture:{value:void 0},pyramidTexture1:{value:void 0},pyramidTexture1Size:{value:void 0},pyramidTexture2:{value:void 0},pyramidTexture2Size:{value:void 0}},this.frustumCulled=!1,this.onBeforeShadowPass=e=>{let t=O.call(this);if(0===this.npart)return void(this.geometry.drawRange.count=0);let i=this.material.root;if(i.shadersPatchedForShapeBlend){if(this.customDepthMaterialNeedsUpdate){this.customDepthMaterialNeedsUpdate=!1,this.customDepthMaterial=new n.ce({vertexShader:i.vertexShader,fragmentShader:"\n						#include <packing>\n						void main()\n						{\n							gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n						}\n					",uniforms:i.uniforms,defines:this.material.defines}),this.isMeshDepthMaterial=!0,this.customDistanceMaterial=new n.ce({vertexShader:i.vertexShader,fragmentShader:"\n					#include <common>\n					#include <packing>\n					uniform vec3 referencePosition;\n					uniform float nearDistance;\n					uniform float farDistance;\n					\n					varying vec3 vWPosition;\n					void main()\n					{\n						float dist = length(vWPosition - referencePosition);\n						dist = (dist - nearDistance) / (farDistance - nearDistance);\n						dist = saturate(dist);\n						\n						gl_FragColor = packDepthToRGBA( dist );\n					}",uniforms:{nearDistance:{value:0},farDistance:{value:0},referencePosition:{value:new n.Fc},opacity:{value:0},...i.uniforms},defines:this.material.defines});let e=this.customDistanceMaterial;e.referencePosition=new n.Fc,e.nearDistance=0,e.farDistance=0,e.opacity=1,e.isMeshDistanceMaterial=!0}}else this.patchVertexShaderForShapeBlend(i),i.shadersPatchedForShapeBlend=!0,this.customDepthMaterialNeedsUpdate=!0;this.spatialPassUniforms.npart.value=this.npart,this.spatialPassUniforms.spatialn.value=this.spatialn,this.potentialPassUniforms.npart.value=this.npart,this.potentialPassUniforms.spatialn.value=this.spatialn;let a=this.needsRebuild;if(this.needsRebuild){this.needsRebuild=!1,this.spatialMesh.material.defines.RES=this.resolutionLevel,this.spatialMesh.material.needsUpdate=!0,this.potentialMesh.material.defines.RES=this.resolutionLevel,this.potentialPassUniforms.spatialPassTexture.value=this.spatialPassRenderTarget.texture,this.potentialMesh.material.needsUpdate=!0,this.voxelMesh.material.defines.RES=this.resolutionLevel,this.voxelMesh.material.needsUpdate=!0,this.voxelPassUniforms.potentialPassTexture.value=this.potentialPassRenderTarget.texture,this.marchPassUniforms.potentialPassTexture.value=this.potentialPassRenderTarget.texture,this.marchPassUniforms.voxelPassTexture.value=this.voxelPassRenderTarget.textures[0],this.material.defines.RES=this.resolutionLevel,this.material.defines.LEVELS=this.pyramidLevelSizes.length,this.material.defines.LOOP=this.pyramidLevelSizes.length%2==0?this.pyramidLevelSizes.length-3:this.pyramidLevelSizes.length-2,this.material.defines.HALF=+(this.pyramidLevelSizes.length%2==0),this.material.needsUpdate=!0;let e=+(this.pyramidLevelSizes.length%2!=0),t=+(this.pyramidLevelSizes.length%2==0);this.marchPassUniforms.pyramidTexture2.value=this.pyramidRenderTarget[e].texture,this.marchPassUniforms.pyramidTexture2Size.value=new n.Dc(this.pyramidRenderTarget[e].width,this.pyramidRenderTarget[e].height),this.marchPassUniforms.pyramidTexture1.value=this.pyramidRenderTarget[t].texture,this.marchPassUniforms.pyramidTexture1Size.value=new n.Dc(this.pyramidRenderTarget[t].width,this.pyramidRenderTarget[t].height),Object.assign(this.material.uniforms,this.marchPassUniforms)}if(!t&&!a&&!this.drawRangeNeedsForceUpdate&&this._passesRenderer===e)return;this._passesRenderer=e;let r=e.shadowMap.enabled;e.shadowMap.enabled=!1;let s=e.getRenderTarget();e.setRenderTarget(this.spatialPassRenderTarget),e.render(this.spatialscene,d),e.setRenderTarget(this.potentialPassRenderTarget),e.render(this.potentialPassScene,d),e.setRenderTarget(this.voxelPassRenderTarget),e.render(this.voxelPassScene,d),g.streamCompaction.renderPyramid(this.resolutionLevel,this.pyramidLevelSizes,e,this.voxelPassRenderTarget,this.pyramidRenderTarget).then(e=>{this.material.wireframe&&(3*e>this.geometry.attributes.position.count||this.drawRangeNeedsForceUpdate)&&(this.geometry.dispose(),this.geometry=new n.dd,this.geometry.userData.parameters={width:this.bboxSize,height:this.bboxSize,depth:this.bboxSize,centerOffset:[this.bboxOffset,this.bboxOffset,this.bboxOffset]},this.geometry.attributes.position=new n.Zc(new Float32Array(3*e*2),3)),(3*e>this.geometry.drawRange.count||this.drawRangeNeedsForceUpdate)&&(this.geometry.drawRange.count=3*Math.floor(1.2*e),this.markSceneShadowsDirty()),this.drawRangeNeedsForceUpdate=!1}),e.shadowMap.enabled=r,e.setRenderTarget(s)}}markSceneShadowsDirty(){let e=this.parent;if(null!==e){for(;e.parent;)e=e.parent;e.markShadowsDirty?.()}}set npart(e){e!==this._npart&&(this.drawRangeNeedsForceUpdate=!0,this._npart=e,this.spatialn=Math.ceil(e/96))}get npart(){return this._npart}set resolutionLevel(e){let t=Math.min(x?9:8,Math.max(5,e));if(t===this._authoredResolutionLevel)return;this._authoredResolutionLevel=t,this.ultraFieldResolution=Math.pow(2,t);let i=Math.min(8,t);switch(this._resolutionLevel=i,this.resolution=Math.pow(2,i),this.resolutionLevel){case 5:this.pyramidLevelSizes=[1,2,4,6,12,24,48,96,192],this.bboxSize=496,this.bboxOffset=-8;break;case 6:this.pyramidLevelSizes=[1,2,4,8,16,32,64,128,256,512],this.bboxSize=504,this.bboxOffset=-4;break;case 7:this.pyramidLevelSizes=[1,2,4,6,12,24,48,96,192,384,768,1536],this.bboxSize=508,this.bboxOffset=-2;break;case 8:this.pyramidLevelSizes=[1,2,4,8,16,32,64,128,256,512,1024,2048,4096],this.bboxSize=510,this.bboxOffset=-1}this.pyramidTexture1Width=0,this.pyramidTexture2Width=0,this.pyramidTexture1Height=this.pyramidLevelSizes[this.pyramidLevelSizes.length-2],this.pyramidTexture2Height=this.pyramidLevelSizes[this.pyramidLevelSizes.length-3];for(let e=this.pyramidLevelSizes.length-2;e>=0;e--)(this.pyramidLevelSizes.length-2)%2==e%2?this.pyramidTexture1Width+=this.pyramidLevelSizes[e]:this.pyramidTexture2Width+=this.pyramidLevelSizes[e];this.basePyramidSize=this.pyramidLevelSizes[this.pyramidLevelSizes.length-1],this.zLayersPerRow=this.basePyramidSize/this.resolution,this.numLevels=this.pyramidLevelSizes.length-1,this.geometry.userData.parameters={width:this.bboxSize,height:this.bboxSize,depth:this.bboxSize,centerOffset:[this.bboxOffset,this.bboxOffset,this.bboxOffset]},this.needsRebuild=!0,this.customDepthMaterialNeedsUpdate=!0}get resolutionLevel(){return this._resolutionLevel}get spatialPassRenderTarget(){let e=this._spatialPassRenderTargets[this.resolutionLevel];return e||(e=new n.Lc(this.spatialDivisions*this.spatialn,this.spatialDivisions**2,{format:n.Ja,type:n.Aa,stencilBuffer:!1,depthBuffer:!1,generateMipmaps:!1,minFilter:n.na,magFilter:n.na}),this._spatialPassRenderTargets[this.resolutionLevel]=e),e}get potentialPassRenderTarget(){let e=this._potentialPassRenderTargets[this.resolutionLevel];return e||(e=new n.Lc(this.basePyramidSize,this.basePyramidSize,{format:n.Ja,type:n.Aa,stencilBuffer:!1,depthBuffer:!1,generateMipmaps:!1,minFilter:n.na,magFilter:n.na}),this._potentialPassRenderTargets[this.resolutionLevel]=e),e}get voxelPassRenderTarget(){let e=this._voxelPassRenderTargets[this.resolutionLevel];return e||((e=new n.Lc(this.basePyramidSize,this.basePyramidSize,{count:2,stencilBuffer:!1,depthBuffer:!1,generateMipmaps:!1,minFilter:n.na,magFilter:n.na})).textures[0].format=n.Ja,e.textures[0].type=n.Aa,e.textures[1].format=n.Ma,e.textures[1].type=n.Aa,this._voxelPassRenderTargets[this.resolutionLevel]=e),e}get pyramidRenderTarget(){let e=this._pyramidRenderTargets[this.resolutionLevel];return e||(e=[new n.Lc(this.pyramidTexture1Width,this.pyramidTexture1Height,{format:n.Ja,type:n.Aa,stencilBuffer:!1,depthBuffer:!1,magFilter:n.na,minFilter:n.na}),new n.Lc(this.pyramidTexture2Width,this.pyramidTexture2Height,{format:n.Ja,type:n.Aa,stencilBuffer:!1,depthBuffer:!1,magFilter:n.na,minFilter:n.na})],this._pyramidRenderTargets[this.resolutionLevel]=e),e}updateGeometryInteractions(){}updateState(e,t){let i=this.material;super.updateState(e,t),i!==this.material&&(this.needsRebuild=!0),e.geometry&&(this.resolutionLevel=e.geometry.resolutionLevel,this.geometry.userData.parameters={width:this.bboxSize,height:this.bboxSize,depth:this.bboxSize,centerOffset:[this.bboxOffset,this.bboxOffset,this.bboxOffset]}),e.wireframe&&!this.geometry.getAttribute("position")?this.geometry.setAttribute("position",new n.Zc(new Float32Array(3*this.geometry.drawRange.count),3)):!e.wireframe&&this.geometry.getAttribute("position")&&this.geometry.deleteAttribute("position")}spatialPassMaterial(){return new l({name:"Spatial Pass",fragmentShader:`
			precision highp float;
			out vec4 pc_FragColor;
			const float spatialDivisions = ${this.spatialDivisions}.;
			uniform float span;
			uniform float npart;
			uniform float spatialn;
			${m.shapeInput()}

			vec3 low, high;     

			
			
			
			float spatialKey(float lowi) {
				float t = 0.;
				for (float ii = 23.; ii >= 0.; ii--) {
					float i = ii + lowi;
					float iin = (i + 0.5) / 96.;
					vec4 shape = shapePos(iin);
					vec3 d = shape.xyz;
					float op = shape.w;
	
					t *= 2.;
					t += (
						low.x < d.x && d.x < high.x &&
						low.y < d.y && d.y < high.y &&
						low.z < d.z && d.z < high.z &&
						i < npart || op == -2. 
					) ? 1. : 0.;
				}
				return t;
			}

			${m.getpart}

			void main() {               
				
				vec3 div;                               
				
				float yz = float(gl_FragCoord.y - 0.5);     
				div.y = getpart(yz, spatialDivisions);
				div.z = yz; 

				float lx = float(gl_FragCoord.x - 0.5);     
				float lowi = getpart(lx, spatialn) * 96.;
				div.x = lx;

				low = div / spatialDivisions * 2. - 1. - span;
				high = (div+1.) / spatialDivisions * 2. - 1. + span;

				
				pc_FragColor.x = spatialKey(lowi);
				pc_FragColor.y = spatialKey(lowi+24.);
				pc_FragColor.z = spatialKey(lowi+48.);
				pc_FragColor.w = spatialKey(lowi+72.);
			}
		`,uniforms:this.spatialPassUniforms})}potentialPassMaterial(){return new l({name:"PotentialPass",fragmentShader:`
			precision highp float;
			out vec4 pc_FragColor;

			${m.shapeInput()}
			uniform sampler2D spatialPassTexture;

			const float res = float(RES);
			const float VOXEL_RESOLUTION = pow(2., res);
			const float Z_LAYERS_PER_ROW = ceil(pow(2., res / 2.));
			const float VOXEL_RESOLUTION_SUB1 = VOXEL_RESOLUTION - 1.;
			const float INV_VOXEL_RESOLUTION = 1.0 / VOXEL_RESOLUTION;

			uniform float npart;
			uniform float spatialn;
			const float spatialDivisions = ${this.spatialDivisions}.;
			const float spatialDivisions2 = spatialDivisions * spatialDivisions;
			const float spatialDivisionsSub1 = spatialDivisions - 1.;

			${m.getpart}

			vec3 packRGBAToVec3(vec4 color) {
				uint r = uint(color.r * 255.);
				uint g = uint(color.g * 255.);
				uint combined = (r << 8) | g; 
				return vec3(float(combined) * 0.00001525902, color.b, color.a); 
			}

			void applyQuaternionToVector(in vec4 q, inout vec3 v) {
				v += 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
			}

			



			
			float smoothOperation(float op, float sdf, float d, float k) {
			  
			  
				

				float signSubtract = clamp(op, -1., 1.);
				float signIntersection = 2. * (op - signSubtract) + 1.;
				float h = clamp(
					0.5 + signSubtract * 0.5 * (sdf - signSubtract * signIntersection * d) / k,
					0.0,
					1.0
				);
				return mix(sdf, signSubtract * signIntersection * d, h) - 
							 signSubtract * k * h * (1.0 - h);
			}

			float sdSphere( vec3 p, float s )
			{
				return length(p)-s;
			}

			float sdEllipsoid( vec3 p, vec3 r )
			{
				float k0 = length(p/r);
				float k1 = length(p/(r*r));
				return k0*(k0-1.0)/k1;
			}

			float sdBox( vec3 p, vec3 b )
			{
				vec3 q = abs(p) - b;
				return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
			}

			float sdTorus( vec3 p, vec2 t )
			{
				vec2 q = vec2(length(p.xy)-t.x,p.z);
				return length(q)-t.y;
			}

			float sdCappedTorus( vec3 p, vec2 sc, float ra, float rb)
			{
				p.x = abs(p.x);
				float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
				return sqrt( dot(p,p) + ra*ra - 2.0*ra*k ) - rb;
			}

			float dot2( in vec2 v ) { return dot(v,v); }
			float sdCappedCone( vec3 p, float h, float r1, float r2 )
			{
				vec2 q = vec2( length(p.xz), p.y );
				vec2 k1 = vec2(r2,h);
				vec2 k2 = vec2(r2-r1,2.0*h);
				vec2 ca = vec2(q.x-min(q.x,(q.y<0.0)?r1:r2), abs(q.y)-h);
				vec2 cb = q - k1 + k2*clamp( dot(k1-q,k2)/dot2(k2), 0.0, 1.0 );
				float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
				return s*sqrt( min(dot2(ca),dot2(cb)) );
			}

			float sdCappedCylinder( vec3 p, float h, float r )
			{
				vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(r,h);
				return min(max(d.x,d.y),0.0) + length(max(d,0.0));
			}

			float maxBlend = 0.0;
			
			
			
			
			void fillSpatialInner(
				float ii,
				float activeKey,
				vec3 corner,
				inout float sdf,
				inout float colorDivisor,
				inout vec4 trackColor
			) {
				for (float i = 0.; i < 24.; i++) {
					if (activeKey < 1.) break; 
					activeKey *= 0.5;
					if (fract(activeKey) < 0.5) continue;

					float iin = (i + ii + 0.5) * ${1/96};
					vec4 shape = shapePos(iin);
					vec4 quat = shapeQuat(iin);
					vec4 params1 = shapeParams1(iin);
					vec4 params2 = shapeParams2(iin);

					vec3 p = corner - shape.xyz;
					applyQuaternionToVector(quat, p);
					p /= params2.z; // scale
					float d; // d in -1..1 coordinates
					switch (int(params1.x)) {
						case 0: d = sdSphere(p, params1.y); break;
						case 1: d = sdEllipsoid(p, params1.yzw); break;
						case 2: d = sdBox(p, params1.yzw); break;
						case 3: d = sdCappedCylinder(p, params1.y, params1.z); break;
						case 4: d = sdCappedCone(p, params1.y, params1.z, params1.w); break;
						case 5: d = sdTorus(p, params1.yz); break;
						case 6: d = sdCappedTorus(p, params1.yz, params1.w, params2.w); break;
						// Mesh children (type 7) live in a WebGPU-only baked SDF
						// atlas — the GLSL evaluator skips the shape entirely
						// (also closes the latent uninitialized-d default).
						default: continue;
					}
					d -= params2.y; // rounded edge
					d *= params2.z; // scale

					float k = params2.x;
					float op = shape.w;

					sdf = smoothOperation(shape.w, sdf, d, k);

					float isNegativeOne = step(-1.5, op) * step(op, -0.5); // 1 when op == -1, 0 otherwise
					float colorCull = smoothstep(maxBlend, 0., -d);
					float cullFactor = mix(1.0, colorCull, isNegativeOne);
					trackColor *= cullFactor;
					colorDivisor *= cullFactor;

					maxBlend = max(maxBlend, k);

					k += 2. * INV_VOXEL_RESOLUTION; // avoid division by zero, and other color artifacts with very small k
					float nearness = smoothstep(k, 0., d);

					vec4 color = shapeColor(iin);
					nearness *= float(color.a >= 0.);

					colorDivisor += nearness;
					trackColor += color * nearness;
				}
			}

			vec3 div;
			// compute potential from all spheres; collect +ve and =ve values separately
			// work in blocks of A*4 (=96) spheres, using the bit flags in 4 float channel 'activeKey' values
			// TODO check if extra vec3 output useful, not really used at present
			float fillSpatial(vec3 corner, inout vec4 trackColor) {
				float sdf = 1e3; // hack: initialize to large value
				float colorDivisor = 0.;
				// spatialPassTexture holds x=> lowi, x faster moving and y=> z, y faster moving
				float divyz = (div.y + div.z * spatialDivisions + 0.5) / (spatialDivisions2);
				for (float ii = 0.; ii < spatialn; ii++) {
					float i = ii * 96.;

					vec4 activeKey = texture(spatialPassTexture, vec2((div.x * spatialn + ii + 0.5)/(spatialn * spatialDivisions), divyz));
					fillSpatialInner(i, activeKey.x, corner, sdf, colorDivisor, trackColor);
					fillSpatialInner(i+24., activeKey.y, corner, sdf, colorDivisor, trackColor);
					fillSpatialInner(i+48., activeKey.z, corner, sdf, colorDivisor, trackColor);
					fillSpatialInner(i+72., activeKey.w, corner, sdf, colorDivisor, trackColor);
				}

				trackColor /= colorDivisor;
				return mix(sdf, 0.0, step(1e20 - 0.1, sdf));
			}

			void main() {
				${m.getxyzi}    

				vec3 xyzi = vec3(xi,yi,zi);
				vec3 corner = xyzi / VOXEL_RESOLUTION_SUB1 * 2. - 1.;  

				div = floor(xyzi / VOXEL_RESOLUTION_SUB1 * spatialDivisionsSub1);

				vec4 c = vec4(0.);
				float t = fillSpatial(corner, c);

				pc_FragColor = vec4(t, packRGBAToVec3(c)); 
			}
		`,uniforms:this.potentialPassUniforms})}voxelPassMaterial(){return new l({name:"VoxelPass",fragmentShader:`
			precision highp float;
			layout(location = 0) out vec4 pc_FragColor;
			layout(location = 1) out vec4 numTris;

			const float res = float(RES);
			const float VOXEL_RESOLUTION = pow(2., res);
			const float VOXEL_RESOLUTION_SUB1 = VOXEL_RESOLUTION - 1.; 
			const float Z_LAYERS_PER_ROW = ceil(pow(2., res / 2.));
			const float INV_VOXEL_RESOLUTION = 1.0 / VOXEL_RESOLUTION;
			uniform sampler2D numTrisTable; 

			float keyi(float f000, float f100, float f010, float f110, float f001, float f101, float f011, float f111) {
				return (float(f000 < 0.) * 1.) +
							 (float(f100 < 0.) * 2.) +
							 (float(f010 < 0.) * 8.) +
							 (float(f110 < 0.) * 4.) +
							 (float(f001 < 0.) * 16.) +
							 (float(f101 < 0.) * 32.) +
							 (float(f011 < 0.) * 128.) +
							 (float(f111 < 0.) * 64.);
			}

			${m.lookup}

			vec3 compNormi(float xi, float yi, float zi) {
				float dx = look(xi + 1., yi, zi, potentialPassTexture).r - look(xi - 1., yi, zi, potentialPassTexture).r;
				float dy = look(xi, yi + 1., zi, potentialPassTexture).r - look(xi, yi - 1., zi, potentialPassTexture).r;
				float dz = look(xi, yi, zi + 1., potentialPassTexture).r - look(xi, yi, zi - 1., potentialPassTexture).r;
				
				
				if (dx == 0.0 && dy == 0.0 && dz == 0.0) {
					return vec3(0.199, 0.299, 0.399);
				}
				return normalize(vec3(dx, dy, dz));
			}

			void main() {
				${m.getxyzi}    

				vec3 normal = compNormi(xi, yi, zi);  

				if (xi >= VOXEL_RESOLUTION_SUB1 || yi >= VOXEL_RESOLUTION_SUB1 || zi >= VOXEL_RESOLUTION_SUB1) {
					pc_FragColor = vec4(normal, 0.);
					numTris = vec4(0.);
					return;
				}

				float
					f000 = look(xi, yi, zi, potentialPassTexture).r,
					f100 = look(xi+1., yi, zi, potentialPassTexture).r,
					f010 = look(xi, yi+1., zi, potentialPassTexture).r,
					f110 = look(xi+1., yi+1., zi, potentialPassTexture).r,
					f001 = look(xi, yi, zi+1., potentialPassTexture).r,
					f101 = look(xi+1., yi, zi+1., potentialPassTexture).r,
					f011 = look(xi, yi+1., zi+1., potentialPassTexture).r,
					f111 = look(xi+1., yi+1., zi+1., potentialPassTexture).r;
				float key = keyi(f000, f100, f010, f110, f001, f101, f011, f111);

				pc_FragColor = vec4(normal, key);

				numTris = texture(numTrisTable, vec2((key + 0.5) / 256., 0.5));
			}
		`,uniforms:this.voxelPassUniforms})}patchVertexShaderForShapeBlend(e){e.vertexShader=`
		#ifdef SHAPEBLEND 
			precision highp sampler2D;

			uniform float isol;

			uniform sampler2D triTable;     
			uniform sampler2D pyramidTexture1;
			uniform vec2 pyramidTexture1Size;
			uniform sampler2D pyramidTexture2;
			uniform vec2 pyramidTexture2Size;

			const vec2 halfPixelOffset = vec2(0.5, 0.5);

			const vec2 rShift = vec2(0., 1.);
			const vec2 gShift = vec2(1., 1.);
			const vec2 bShift = vec2(1., 0.);

			const float res = float(RES);
			const float VOXEL_RESOLUTION = pow(2., res);
			const float Z_LAYERS_PER_ROW = ceil(pow(2., res / 2.));
			const float INV_VOXEL_RESOLUTION = 1.0 / VOXEL_RESOLUTION;

			const float scale_factor = 2.;

			#if SHAPEBLEND == 5
				const float levelShiftX[7] = float[7](4., 6., 12., 24., 48., 96., 192.);
				const float scale = 8. * scale_factor;
				const vec3 originOffset = vec3(16.);
			#elif SHAPEBLEND == 7
				const float levelShiftX[10] = float[10](4., 6., 12., 24., 48., 96., 192., 384., 768., 1536.); 
				const float scale = 2. * scale_factor;
				const vec3 originOffset = vec3(64.);
			#elif SHAPEBLEND == 8
				const float levelShiftX[11] = float[11](4., 8., 16., 32., 64., 128., 256., 512., 1024., 2048., 4096.);
				const float scale = scale_factor;
				const vec3 originOffset = vec3(128.);
			#else
				const float levelShiftX[8] = float[8](4., 8., 16., 32., 64., 128., 256., 512.);
				const float scale = 4. * scale_factor;
				const vec3 originOffset = vec3(32.);
			#endif

			${m.lookup}

			const vec3 offsets[24] = vec3[](
				vec3(0., 0., 0.), vec3(1., 0., 0.),
				vec3(1., 0., 0.), vec3(1., 1., 0.),
				vec3(0., 1., 0.), vec3(1., 1., 0.),
				vec3(0., 0., 0.), vec3(0., 1., 0.),
				vec3(0., 0., 1.), vec3(1., 0., 1.),
				vec3(1., 0., 1.), vec3(1., 1., 1.),
				vec3(0., 1., 1.), vec3(1., 1., 1.),
				vec3(0., 0., 1.), vec3(0., 1., 1.),
				vec3(0., 0., 0.), vec3(0., 0., 1.),
				vec3(1., 0., 0.), vec3(1., 0., 1.),
				vec3(1., 1., 0.), vec3(1., 1., 1.),
				vec3(0., 1., 0.), vec3(0., 1., 1.)
			);

			vec2 computeShiftedPosition1(vec2 xy, float levelOriginX) {
				vec2 xyShifted = xy;
				xyShifted.x += levelOriginX;
				return (xyShifted + halfPixelOffset) / pyramidTexture1Size;
			}

			vec2 computeShiftedPosition2(vec2 xy, float levelOriginX) {
				vec2 xyShifted = xy;
				xyShifted.x += levelOriginX;
				return (xyShifted + halfPixelOffset) / pyramidTexture2Size;
			}

			vec4 unpackVec3ToRGBA(vec3 vec) {
				uint combined = uint(vec.x * 65535.0 + 0.5); 
				float g = float(combined & uint(0xFF)) * 0.00392156862; 
				float r = float((combined >> 8) & uint(0xFF)) * 0.00392156862; 
		
				return vec4(r, g, vec.y, vec.z);
			}

			out vec4 marchColor;
			
		#endif
		`+e.vertexShader.replace("#include <project_vertex>","\n		#ifdef SHAPEBLEND\n			float triIndex = floor(float(gl_VertexID/3));\n			float vertexIndex = float(gl_VertexID);\n			\n			\n			float levelOriginX1 = pyramidTexture1Size.x - 2.;\n			float levelOriginX2 = pyramidTexture2Size.x - 1.;\n			vec2 xy = vec2(0.);\n			vec4 lookUp = texture(pyramidTexture2, computeShiftedPosition2(xy, levelOriginX2));\n			\n			\n			if (triIndex >= lookUp.r) return;\n			\n			\n			float start = 0.;\n			vec4 triIndexVec = vec4(triIndex);\n			\n			\n			for (int i = 0; i < LOOP;) {\n				\n				vec4 ends = lookUp + vec4(start);\n				vec4 starts = vec4(ends.gba, start);\n				vec4 check = vec4(greaterThanEqual(triIndexVec, starts)) * \n											vec4(lessThan(triIndexVec, ends));\n				\n				\n				xy *= 2.;\n				xy += check.r * rShift + check.g * gShift + check.b * bShift;\n				\n				\n				start = dot(check, starts);\n				levelOriginX2 -= levelShiftX[i];\n				\n				\n				lookUp = texture(pyramidTexture1, computeShiftedPosition1(xy, levelOriginX1));\n				i++;\n\n				ends = lookUp + vec4(start);\n				starts = vec4(ends.gba, start);\n				check = vec4(greaterThanEqual(triIndexVec, starts)) * \n											vec4(lessThan(triIndexVec, ends));\n				\n				\n				xy *= 2.;\n				xy += check.r * rShift + check.g * gShift + check.b * bShift;\n				\n				\n				start = dot(check, starts);\n				levelOriginX1 -= levelShiftX[i];\n				\n				\n				lookUp = texture(pyramidTexture2, computeShiftedPosition2(xy, levelOriginX2));\n\n				i++;\n			}\n\n			#if HALF == 1\n				vec4 ends = lookUp + vec4(start);\n				vec4 starts = vec4(ends.gba, start);\n				vec4 check = vec4(greaterThanEqual(triIndexVec, starts)) * vec4(lessThan(triIndexVec, ends));\n			\n				\n				xy *= 2.;\n				xy += check.r * rShift + check.g * gShift + check.b * bShift;\n			\n				\n				start = dot(check, starts);\n			#endif\n			\n			\n			vec3 gridPos;\n			gridPos.x = mod(xy.x, VOXEL_RESOLUTION);\n			gridPos.y = mod(xy.y, VOXEL_RESOLUTION);\n			gridPos.z = floor(xy.x * INV_VOXEL_RESOLUTION) + \n									floor(xy.y * INV_VOXEL_RESOLUTION) * Z_LAYERS_PER_ROW;\n			\n			\n			vertexIndex -= start * 3.;\n			float vk = vertexIndex * 0.0625 + 0.03125; \n			\n			\n			vec4 voxel = look(gridPos.x, gridPos.y, gridPos.z, voxelPassTexture);\n			float key = (voxel.w + 0.5) * 0.00390625; \n			\n			\n			float edgeNum = texture(triTable, vec2(vk, key)).x;\n			int edgeIndex = int(edgeNum) * 2;\n			\n			\n			vec3 p1 = gridPos + offsets[edgeIndex];\n			vec3 p2 = gridPos + offsets[edgeIndex + 1];\n			\n			\n			vec4 potential1 = look(p1.x, p1.y, p1.z, potentialPassTexture);\n			vec4 potential2 = look(p2.x, p2.y, p2.z, potentialPassTexture);\n			\n			\n			float mu = potential1.r / (potential1.r - potential2.r);\n\n			marchColor = mix(\n				unpackVec3ToRGBA(potential1.gba),\n				unpackVec3ToRGBA(potential2.gba),\n				mu\n			);\n\n			transformed = p1 + (p2 - p1) * mu;\n			transformed -= originOffset;\n			transformed *= scale;\n			vec4 data1 = look(p1.x, p1.y, p1.z, voxelPassTexture);\n			vec4 data2 = look(p2.x, p2.y, p2.z, voxelPassTexture);\n			objectNormal = normalize(mix(data1.xyz, data2.xyz, mu));\n			transformedNormal = normalMatrix * objectNormal;\n			#ifndef FLAT_SHADED\n				vNormal = transformedNormal;\n			#endif\n		#endif\n		\n#include <project_vertex>");let t=e.fragmentShader.match(/vec3 diffuseColor[^\n]*\n/);if(!t)return;let i=`
		#ifdef SHAPEBLEND_C
			#if SHAPEBLEND_C == 1
				${t[0].replace(/nodeU0,/g,"marchColor.rgb,").replace(/nodeU\d+(?=,g_uid\d+_calpha\))/g,"marchColor.a")}
			#else
				${t[0]}
			#endif
		#else
			${t[0]}
		#endif
		`;e.fragmentShader="in vec4 marchColor;\n"+e.fragmentShader.replace(t[0],i),Object.assign(e.uniforms,this.marchPassUniforms)}initDebugPass(e){console.log("fboToDebug.width",e.width,e.height),this.geometry=new n.Vd(e.width,e.height),this.geometry.userData={parameters:{width:4,height:4}};let t={inputTexture:{value:e.textures.length>1?e.textures[1]:e.texture},pyramidTextureSize:{value:void 0}},i=e=>{e.vertexShader="\n				precision highp float;\n\n				varying vec2 vUv;\n\n				void main() {\n						gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n						vUv = uv;\n				}\n			",e.fragmentShader="\n				layout(location = 1) out vec4 gVelocity;\n\n				precision highp float;\n				\n				uniform sampler2D inputTexture;\n				varying vec2 vUv;\n\n				uniform vec2 pyramidTextureSize;\n\n				void main() {\n						\n						gl_FragColor = texture(inputTexture, vUv);\n						gVelocity = vec4(0.0);\n				}\n			",t.pyramidTextureSize.value=new n.Dc(this.pyramidRenderTarget[0].width,this.pyramidRenderTarget[0].height),Object.assign(e.uniforms,t)};this.material.shapeBlendhack=i,this.material.root.shapeBlendhack=i}dispose(){super.dispose(),f()?.release(this)}};g.streamCompaction=new class{constructor(){this.pyramidPassScene=new n.Vc,this.pyramidPassMaterial=new l({name:"PyramidPass"}),this.pyramidPassUniforms={inputTexture:{value:void 0},inputWidth:{value:0},inputHeight:{value:0},inputShiftX:{value:0},outputShiftX:{value:0}},this.pyramidTopLevelReadPixelBuffer=new Float32Array(4),this.pyramidPassMaterial.fragmentShader="\n			precision highp float;\n			precision highp sampler2D;\n			layout(location = 0) out vec4 pc_FragColor;\n			uniform sampler2D inputTexture;\n			uniform float inputWidth;\n			uniform float inputHeight;\n			uniform float inputShiftX;\n			uniform float outputShiftX;\n			const vec2 half_unit_coord = vec2(0.5);\n			const vec4 one = vec4(1.0);\n			void main() {\n				vec2 inputSize = vec2(inputWidth, inputHeight);\n				vec2 input_pixel_uv = 1. / inputSize;\n				vec2 coord = gl_FragCoord.xy - half_unit_coord;\n				coord.x -= outputShiftX;\n				coord = coord * 2. + half_unit_coord;\n				coord.x += inputShiftX;\n\n				\n				vec2 input_uv = coord / inputSize;\n				float bl = texture(inputTexture, input_uv).r;\n\n				\n				input_uv.x += input_pixel_uv.x;\n				float br = texture(inputTexture, input_uv).r;\n\n				\n				input_uv.y += input_pixel_uv.y;\n				float tr = texture(inputTexture, input_uv).r;\n\n				\n				input_uv.x -= input_pixel_uv.x;\n				float tl = texture(inputTexture, input_uv).r;\n\n				pc_FragColor.a = bl;\n				pc_FragColor.b = pc_FragColor.a + br;\n				pc_FragColor.g = pc_FragColor.b + tr;\n				pc_FragColor.r = pc_FragColor.g + tl; \n			}\n		",this.pyramidPassMaterial.uniforms=this.pyramidPassUniforms,this.pyramidPassMaterial.depthTest=!1,this.pyramidPassMaterial.depthWrite=!1;let e=new n.ld(o,this.pyramidPassMaterial);e.frustumCulled=!1,this.pyramidPassScene.add(e)}renderPyramid(e,t,i,a,r){(new n.Qe).min.setScalar(0);let s=t.length-1,o=new n.Jc;i.getViewport(o),this.pyramidPassUniforms.inputShiftX.value=0,this.pyramidPassUniforms.outputShiftX.value=0;let l=s-1;for(let s=l;s>=0;s--){let n=s%2==l%2?r[0]:r[1],o=s===l?a:s%2==l%2?r[1]:r[0];this.pyramidPassUniforms.inputTexture.value=o.textures.length>1?o.textures[1]:o.texture,this.pyramidPassUniforms.inputWidth.value="width"in o?o.width:1,this.pyramidPassUniforms.inputHeight.value="height"in o?o.height:1,i.setRenderTarget(n);let h=t[s],c=i.getPixelRatio();i.setViewport(this.pyramidPassUniforms.outputShiftX.value/c,0,h/c,h/c),2===s&&e%2!=0&&i.setViewport(this.pyramidPassUniforms.outputShiftX.value/c,0,3/c,3/c),i.render(this.pyramidPassScene,d);let p=this.pyramidPassUniforms.inputShiftX.value;this.pyramidPassUniforms.inputShiftX.value=this.pyramidPassUniforms.outputShiftX.value,this.pyramidPassUniforms.outputShiftX.value=p,s<l&&(this.pyramidPassUniforms.outputShiftX.value+=t[s+1])}i.setViewport(o);let h=+(t.length%2!=0);return i.readRenderTargetPixelsAsync(r[h],r[h].width-1,0,1,1,this.pyramidTopLevelReadPixelBuffer).then(()=>this.pyramidTopLevelReadPixelBuffer[0])}};var b=new n.Oc,S=new n.Oc,w=new n.Ec,T=new n.Fc,_=new n.Fc,P=new n.Ec;function M(e,t=0){let i=this.children.length;for(;i--;){let a=this.children[i];r.e.is(a)&&z.call(a,e,t+1)}}function z(e,t=0){if(!0!==e(this,t)){let i=this.children.length;for(;i--;){let a=this.children[i];r.e.is(a)&&z.call(a,e,t+1)}}}function O(){if(void 0===this.shapesDataTexture.value){let e=new n.nd(new Float32Array(1920),96,5,n.Ja,n.Aa);this.shapesDataTexture.value=e}let e=this.shapesDataTexture.value,o=e.image.data,l=0,h=0,d=this.data.geometry.blendRange,c=b.copy(this.matrixWorld).invert(),p=this._npart,u=0;this._meshSdfWanted.clear();let f=null;if(M.call(this,e=>{let n;if(!1===e.visible)return!0;if(e instanceof t.a||e instanceof i.a||(0,s.a)(e))return;n=e instanceof a.da?e.object:e;let p=e.data?.cloner;if(r.h.is(e)&&p&&!p.hideBase&&"radial"!==p.type&&!0!==p.disabled||!(n instanceof a.ia))return;let m=n.geometry.userData.parameters,v=m?.shapeBlendNode??n.dataPatched?.geometry?.shapeBlendNode;if(void 0===v)return;if(S.multiplyMatrices(c,e.matrixWorld).decompose(_,w,T),"TorusGeometry"===m?.type&&360!==m.arc){let e=m.arc*Math.PI/180;e/=4,w.multiply(P.set(0,0,Math.sin(e),Math.cos(e)))}let x=v.overrideGlobalBlend?v.blendRange:d;x=x/this.bboxSize*2,o[4*u]=(_.x-this.bboxOffset)/this.bboxSize*2,o[4*u+1]=(_.y-this.bboxOffset)/this.bboxSize*2,o[4*u+2]=(_.z-this.bboxOffset)/this.bboxSize*2,o[4*u+3]=0===v.operation?1:2===v.operation?-1:-2,o[384+4*u]=-w.x,o[384+4*u+1]=-w.y,o[384+4*u+2]=-w.z,o[384+4*u+3]=w.w;let g=new Float32Array(4),b=0,M=x;if("SphereGeometry"===m?.type)m.width===m.height&&m.width===m.depth?g[0]=0:g[0]=1,g[1]=m.width/this.bboxSize,g[2]=m.height/this.bboxSize,g[3]=m.depth/this.bboxSize,M=Math.max(g[1],g[2],g[3])*T.x+x;else if("CubeGeometry"===m?.type){b=m.cornerRadius;let e=m.width,t=m.height,i=m.depth;g[0]=2,g[1]=(e-2*b)/this.bboxSize,g[2]=(t-2*b)/this.bboxSize,g[3]=(i-2*b)/this.bboxSize,M=Math.sqrt(e**2+t**2+i**2)/this.bboxSize*T.x+x}else if("CylinderGeometry"===m?.type){b=m.cornerRadius;let e=m.height,t=m.radiusBottom,i=m.radiusTop;if(i>=t){let a=(Math.PI/2-Math.atan2(i-t,e))/2;i-=b/Math.tan(a),t-=b*Math.tan(a)}else if(t>i){let a=(Math.PI/2-Math.atan2(t-i,e))/2;i-=b*Math.tan(a),t-=b/Math.tan(a)}g[1]=(m.height-2*b)/this.bboxSize,t===i?(g[0]=3,g[2]=t/this.bboxSize*2):(g[0]=4,g[2]=t/this.bboxSize*2,g[3]=i/this.bboxSize*2),M=(Math.hypot(g[1],Math.max(Math.abs(g[2]),Math.abs(g[3])))+b/this.bboxSize*2)*T.x+x}else if("TorusGeometry"===m?.type){if(g[0]=5,g[1]=(m.width-m.depth)/this.bboxSize,g[2]=m.depth/this.bboxSize,360!==m.arc){g[0]=6,g[3]=g[1],o[1152+4*u+3]=g[2];let e=2*Math.atan2(g[2]/2,g[1]),t=m.arc*Math.PI/180/2-e;g[1]=Math.sin(t),g[2]=Math.cos(t)}M=m.width*T.x/this.bboxSize+x}else{let e=n.geometry;(f??(f=new Set)).add(e.uuid);let t=this._meshSdfBaked.get(e.uuid),i=y(e);if((void 0===t||t.posVersion!==i)&&this._meshSdfWanted.set(e.uuid,e),void 0===t)return;g[0]=7,g[1]=t.slot,g[2]=t.boxHalf.x/this.bboxSize*2,g[3]=t.boxHalf.y/this.bboxSize*2,o[1152+4*u+3]=t.boxHalf.z/this.bboxSize*2,M=Math.hypot(t.boxHalf.x,t.boxHalf.y,t.boxHalf.z)/this.bboxSize*2*T.x+x}o.set(g,768+4*u),l=Math.max(l,M),h=Math.max(h,x),this._reach[u]=M,o[1152+4*u]=x,o[1152+4*u+1]=b/this.bboxSize*2,o[1152+4*u+2]=T.x;let z,O,R=Array.isArray(n.material)?n.material[0]:n.material;if(R?.getShapeBlendBaseColor){let e=R.getShapeBlendBaseColor();z=e,O=e.a}else void 0!==R?.uniforms?.nodeU0?(z=R.uniforms.nodeU0.node.value,O=R.uniforms.nodeU1?.value??1):(z={r:1,g:1,b:1},O=1);0===v.operation||v.useColor||(O=-1),o[1536+4*u]=z.r,o[1536+4*u+1]=z.g,o[1536+4*u+2]=z.b,o[1536+4*u+3]=O,O<1&&1===this.material.defines?.SHAPEBLEND_C&&this.material.setTransparent(!0),u++}),this._meshSdfBaked.size>0){let e=f??new Set;for(let t of this._meshSdfBaked.keys())e.has(t)||this._meshSdfBaked.delete(t)}this.npart=u,this._maxBlendK=h;let m=1.1*l+2/(this.spatialDivisions-1)+4/(this.resolution-1);this.spatialPassUniforms.span.value=m;let x=this._prevShapeData,g=p!==u,z=null===x||this._prevSpan!==m||g,O=z||v,R=this._fieldDirtyMin.set(1/0,1/0,1/0),F=this._fieldDirtyMax.set(-1/0,-1/0,-1/0);if(null!==x){let e=Math.max(u,p);for(let t=0;t<e;t++){let e=!1;for(let i=0;i<5;i++){let a=384*i+4*t;if(o[a]!==x[a]||o[a+1]!==x[a+1]||o[a+2]!==x[a+2]||o[a+3]!==x[a+3]){e=!0;break}}if(!e)continue;if(z=!0,O)break;let i=o[4*t],a=o[4*t+1],r=o[4*t+2],s=x[4*t],n=x[4*t+1],l=x[4*t+2],h=this._reach[t],d=this._prevReach[t];Number.isFinite(i+a+r+h)&&Number.isFinite(s+n+l+d)?(R.x=Math.min(R.x,i-h,s-d),R.y=Math.min(R.y,a-h,n-d),R.z=Math.min(R.z,r-h,l-d),F.x=Math.max(F.x,i+h,s+d),F.y=Math.max(F.y,a+h,n+d),F.z=Math.max(F.z,r+h,l+d)):O=!0}}return v&&(z=!0),this._fieldDirtyFull=O||R.x===1/0,z&&(null===x?this._prevShapeData=new Float32Array(o):x.set(o),this._prevReach.set(this._reach),this._prevSpan=m,e.needsUpdate=!0),z}e.s(["a",0,h,"b",0,function(e){c=e},"c",0,function(){return c},"d",0,function(e){p=e},"e",0,function(){return p},"f",0,function(e){u=e},"g",0,f,"h",0,24,"i",0,96,"j",0,y,"k",0,g,"l",0,function(e){return O.call(e)}])},81014,e=>{"use strict";var t=e.i(98416),i=e.i(86609),a=new i.Fc,r=new i.Oc,s=new i.jd,n=class extends t.ia{constructor(e,t,i){super(e,t,i),this.data=t}get textGeometry(){return this.geometry}get charWidths(){return this.textGeometry.charWidths}get charCoords(){return this.textGeometry.charCoords}get wrappedText(){return this.textGeometry.wrappedText}get font(){return this.textGeometry.font}get initialOffsetY(){let e=this.dataPatched;return this.font?.getLineInitialOffsetY(this.lineHeight,this.wrappedText.length,"number"==typeof e.geometry.height?e.geometry.height:1,this.fontScale,e.geometry.verticalAlign)??0}get fontScale(){let e=this.dataPatched;return this.font?e.geometry.fontSize/this.font.unitsPerEm:1}get AD(){return Math.abs(this.ascender-this.descender)}get ascender(){return(this.font?.ascender??1)*this.fontScale}get descender(){return(this.font?.descender??1)*this.fontScale}get lineHeight(){let e=this.dataPatched;return e.geometry.fontSize*e.geometry.lineHeight}raycast(e,t){let{matrixWorld:i}=this;if(!isNaN(e.ray.origin.x)&&0!==this.scale.x&&0!==this.scale.y&&0!==this.scale.z&&(r.copy(i).invert(),s.copy(e.ray).applyMatrix4(r),s.intersectBox(this.singleBBox,a))){let r=a.applyMatrix4(i),s=e.ray.origin.distanceTo(r);t.push({distance:s,point:r.clone(),object:this})}}};e.s(["a",0,n])},69630,e=>{"use strict";var t=e.i(81014),i=e.i(30249),a=e.i(98416),r=e.i(46340),s=e.i(20518),n=e.i(76507),o=e.i(64693),l=e.i(86609),h=e.i(90103),d=(0,h.b)((0,h.a)((t,i)=>{var a;a=function(){return e.importState=function(t){var i=new e;return i.importState(t),i},e;function e(){return function(e){var t,i,a=0,r=0,s=0,n=1;0==e.length&&(e=[+new Date]);var o=(t=0xefc8249d,(i=function(e){e=e.toString();for(var i=0;i<e.length;i++){var a=.02519603282416938*(t+=e.charCodeAt(i));a-=t=a>>>0,t=(a*=t)>>>0,t+=0x100000000*(a-=t)}return 23283064365386963e-26*(t>>>0)}).version="Mash 0.9",i);a=o(" "),r=o(" "),s=o(" ");for(var l=0;l<e.length;l++)(a-=o(e[l]))<0&&(a+=1),(r-=o(e[l]))<0&&(r+=1),(s-=o(e[l]))<0&&(s+=1);o=null;var h=function(){var e=2091639*a+23283064365386963e-26*n;return a=r,r=s,s=e-(n=0|e)};return h.next=h,h.uint32=function(){return 0x100000000*h()},h.fract53=function(){return h()+11102230246251565e-32*(2097152*h()|0)},h.version="Alea 0.9",h.args=e,h.exportState=function(){return[a,r,s,n]},h.importState=function(e){a=+e[0]||0,r=+e[1]||0,s=+e[2]||0,n=+e[3]||0},h}(Array.prototype.slice.call(arguments))}},"object"==typeof t?i.exports=a():"function"==typeof define&&define.amd?((t,i="function"!=typeof t?t:t(e.r,exports,module))=>void 0!==i&&e.v(i))(a):t.Alea=a()})()),c=.5*(Math.sqrt(3)-1),p=(3-Math.sqrt(3))/6,u=1/3,f=1/6,m=e=>0|Math.floor(e),v=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),x=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function y(e){let t=new Uint8Array(512);for(let e=0;e<256;e++)t[e]=e;for(let i=0;i<255;i++){let a=i+~~(e()*(256-i)),r=t[i];t[i]=t[a],t[a]=r}for(let e=256;e<512;e++)t[e]=t[e-256];return t}var g=new l.Wc,b=class{constructor(e){this.weightAttribute=null;let t=e.geometry;if(!t.isBufferGeometry||3!==t.attributes.position.itemSize)throw Error("THREE.MeshSurfaceSampler: Requires BufferGeometry triangle mesh.");t.index&&(t=t.toNonIndexed()),this.geometry=t,this.randomFunction=Math.random,this.positionAttribute=this.geometry.getAttribute("position"),this.distribution=null}build(){let e=this.positionAttribute,t=new Float32Array(e.count/3);for(let i=0;i<e.count;i+=3){let a=1;g.a.fromBufferAttribute(e,i),g.b.fromBufferAttribute(e,i+1),g.c.fromBufferAttribute(e,i+2),a*=g.getArea(),t[i/3]=a}this.distribution=new Float32Array(e.count/3);let i=0;for(let e=0;e<t.length;e++)i+=t[e],this.distribution[e]=i;return this}setRandomGenerator(e){return this.randomFunction=e,this}sample(e,t){if(this.distribution){let i=this.distribution[this.distribution.length-1],a=this.binarySearch(this.randomFunction()*i);return this.sampleFace(a,e,t)}}binarySearch(e){if(!this.distribution)return 0;let t=this.distribution,i=0,a=t.length-1,r=-1;for(;i<=a;){let s=Math.ceil((i+a)/2);if(0===s||t[s-1]<=e&&t[s]>e){r=s;break}e<t[s]?a=s-1:i=s+1}return r}sampleFace(e,t,i){let a=this.randomFunction(),r=this.randomFunction();return a+r>1&&(a=1-a,r=1-r),g.a.fromBufferAttribute(this.positionAttribute,3*e),g.b.fromBufferAttribute(this.positionAttribute,3*e+1),g.c.fromBufferAttribute(this.positionAttribute,3*e+2),t.set(0,0,0).addScaledVector(g.a,a).addScaledVector(g.b,r).addScaledVector(g.c,1-(a+r)),g.getNormal(i),this}},S={x:[1,0,0],"-x":[-1,0,0],y:[0,1,0],"-y":[0,-1,0],z:[0,0,1],"-z":[0,0,-1]},w={polygon_center:0,edge:1,vertex:2},T=(e,t)=>(i,a)=>t&&0!==i&&0!==e?e*a/100:0,_=(e,t)=>{let i=Math.abs(t),a=-1*i;return(e- -1)*(i-a)/2+a},P=new l.Fc,M=new l.Fc,z=new l.Fc,O=new l.Fc;function R(e,t){let i=z.fromArray(e),a=O.fromArray(t);M.copy(a).sub(i);let r=M.length();return M.normalize().multiplyScalar(.5*r),P.copy(i).add(M).toArray()}var F,L,k,A,D=new l.Wc,U=new l.Fc,E=new l.Fc,C=new l.Fc,N=class extends l.qd{},V=class extends N{constructor(e,t){super(void 0,void 0,t),this.source=e,this.isClonerInstancedMesh=!0,this.hiddenMatrix=new l.Oc,this.pivotMatrix=new l.Oc,this.previousModelViewMatrix=new l.Oc,this.copyPreviousMatrix=!0,this.capacity=t,this.count=0,this.matrixAutoUpdate=!1}raycast(e,t){}updateMatrixWorld(e){for(let t of(this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(null===this.parent?this.matrixWorld.multiplyMatrices(this.hiddenMatrix,this.matrix):(this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.hiddenMatrix),this.matrixWorld.multiplyMatrices(this.matrixWorld,this.matrix)),this.matrixWorld.multiply(this.pivotMatrix),this.matrixWorldNeedsUpdate=!1,e=!0),this.children))t.updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e&&null!==i&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.multiplyMatrices(this.hiddenMatrix,this.matrix):(this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.hiddenMatrix),this.matrixWorld.multiplyMatrices(this.matrixWorld,this.matrix)),this.matrixWorld.multiply(this.pivotMatrix),t)for(let e of this.children)e.updateWorldMatrix(!1,!0)}onAfterRender(e,t,i,a,r,s){this.copyPreviousMatrix&&this.previousModelViewMatrix.copy(this.modelViewMatrix)}get visible(){return!0!==this.source.cloner?.insideBoolean&&(this.source.visible||this.source.dataPatched.visible&&!0===this.source.dataPatched.cloner?.hideBase)}set visible(e){}get castShadow(){return this.source.castShadow}set castShadow(e){}get receiveShadow(){return this.source.receiveShadow}set receiveShadow(e){}get layers(){return this.source.layers}set layers(e){}get geometry(){return this.source.geometry}set geometry(e){}get material(){return this.source.material}set material(e){}get morphTargetInfluences(){return this.source.morphTargetInfluences}set morphTargetInfluences(e){}},I=e=>.5*(1-Math.cos(e*Math.PI)),B=class{constructor(){this.perlin=Array(4096)}noise(e,t=0,i=0){if(null==this.perlin){this.perlin=Array(4096);for(let e=0;e<4096;e++)this.perlin[e]=Math.random()}e<0&&(e=-e),t<0&&(t=-t),i<0&&(i=-i);let a,r,s,n,o,l=Math.floor(e),h=Math.floor(t),d=Math.floor(i),c=e-l,p=t-h,u=i-d,f=0,m=.5;for(let e=0;e<4;e++){let e=l+(h<<4)+(d<<8);a=I(c),r=I(p),s=this.perlin[4095&e],s+=a*(this.perlin[e+1&4095]-s),n=this.perlin[e+16&4095],n+=a*(this.perlin[e+16+1&4095]-n),s+=r*(n-s),e+=256,n=this.perlin[4095&e],n+=a*(this.perlin[e+1&4095]-n),o=this.perlin[e+16&4095],o+=a*(this.perlin[e+16+1&4095]-o),n+=r*(o-n),s+=I(u)*(n-s),f+=s*m,m*=.5,l<<=1,h<<=1,p*=2,d<<=1,u*=2,(c*=2)>=1&&(l++,c--),p>=1&&(h++,p--),u>=1&&(d++,u--)}return f}noiseSeed(e){let t,i,a={setSeed(e){i=t=(e??0x100000000*Math.random())>>>0},getSeed:()=>t,rand:()=>(i=(1664525*i+0x3c6ef35f)%0x100000000)/0x100000000};a.setSeed(e),this.perlin=Array(4096);for(let e=0;e<4096;e++)this.perlin[e]=a.rand()}},j=new l.Fc,W=new l.Fc;a.G.then(e=>{L=[(F=e).get_face_center,F.get_edge_midpoint,F.get_vertex_position],k=[F.get_face_normal,F.get_edge_normal,F.get_vertex_normal],A=[F.face_count,F.edge_count,F.vertex_count]}),new l.Oc;var X=new l.Oc,q=new l.Oc,H=new l.Oc,G=new l.Oc,K=new l.Oc,$=new l.Oc,Z=new l.Oc,Y=new l.Fc,J=new l.Fc,Q=new l.Fc,ee=new l.Fc,et=new l.Fc,ei=new l.Fc,ea=new l.Fc,er=new l.Fc,es=new l.Fc,en=new l.Fc,eo=new l.Fc,el=new l.Pc,eh=new l.Ec;function ed(e){return e?e.version??e.data?.version??0:-1}function ec(e,t){return["number"==typeof e?.[0]?e[0]:"string"==typeof e?.[0]&&t?parseFloat(String(t.shared.getVariable(e[0])??"0")):0,"number"==typeof e?.[1]?e[1]:"string"==typeof e?.[1]&&t?parseFloat(String(t.shared.getVariable(e[1])??"0")):0,"number"==typeof e?.[2]?e[2]:"string"==typeof e?.[2]&&t?parseFloat(String(t.shared.getVariable(e[2])??"0")):0]}var ep=class{constructor(e,t){this.data=e,this.is3D=t,this.perlin=new B,"perlin"===e.noiseType?(this.perlin.noiseSeed(e.seed),this.noise=t?(e,t,i)=>this.perlin.noise(e,t,i):e=>this.perlin.noise(e)):this.noise=t?function(e=Math.random){let t=y(e),i=new Float64Array(t).map(e=>x[e%12*3]),a=new Float64Array(t).map(e=>x[e%12*3+1]),r=new Float64Array(t).map(e=>x[e%12*3+2]);return function(e,s,n){let o,l,h,d,c,p,v,x,y,g,b=(e+s+n)*u,S=m(e+b),w=m(s+b),T=m(n+b),_=(S+w+T)*f,P=e-(S-_),M=s-(w-_),z=n-(T-_);P>=M?M>=z?(c=1,p=0,v=0,x=1,y=1,g=0):(P>=z?(c=1,p=0,v=0):(c=0,p=0,v=1),x=1,y=0,g=1):M<z?(c=0,p=0,v=1,x=0,y=1,g=1):P<z?(c=0,p=1,v=0,x=0,y=1,g=1):(c=0,p=1,v=0,x=1,y=1,g=0);let O=P-c+f,R=M-p+f,F=z-v+f,L=P-x+2*f,k=M-y+2*f,A=z-g+2*f,D=P-1+.5,U=M-1+.5,E=z-1+.5,C=255&S,N=255&w,V=255&T,I=.6-P*P-M*M-z*z;if(I<0)o=0;else{let e=C+t[N+t[V]];I*=I,o=I*I*(i[e]*P+a[e]*M+r[e]*z)}let B=.6-O*O-R*R-F*F;if(B<0)l=0;else{let e=C+c+t[N+p+t[V+v]];B*=B,l=B*B*(i[e]*O+a[e]*R+r[e]*F)}let j=.6-L*L-k*k-A*A;if(j<0)h=0;else{let e=C+x+t[N+y+t[V+g]];j*=j,h=j*j*(i[e]*L+a[e]*k+r[e]*A)}let W=.6-D*D-U*U-E*E;if(W<0)d=0;else{let e=C+1+t[N+1+t[V+1]];W*=W,d=W*W*(i[e]*D+a[e]*U+r[e]*E)}return 32*(o+l+h+d)}}((0,d.default)(e.seed)):function(e=Math.random){let t=y(e),i=new Float64Array(t).map(e=>v[e%12*2]),a=new Float64Array(t).map(e=>v[e%12*2+1]);return function(e,r){let s,n,o=0,l=0,h=0,d=(e+r)*c,u=m(e+d),f=m(r+d),v=(u+f)*p,x=e-(u-v),y=r-(f-v);x>y?(s=1,n=0):(s=0,n=1);let g=x-s+p,b=y-n+p,S=x-1+2*p,w=y-1+2*p,T=255&u,_=255&f,P=.5-x*x-y*y;if(P>=0){let e=T+t[_];P*=P,o=P*P*(i[e]*x+a[e]*y)}let M=.5-g*g-b*b;if(M>=0){let e=T+s+t[_+n];M*=M,l=M*M*(i[e]*g+a[e]*b)}let z=.5-S*S-w*w;if(z>=0){let e=T+1+t[_+1];z*=z,h=z*z*(i[e]*S+a[e]*w)}return 70*(o+l+h)}}((0,d.default)(e.seed??""))}},eu=class extends(0,r.f)(l.Rc){constructor(e,t){super(),this.parameters=t,this.isCloner=!0,this.objectForSample=void 0,this._pendingMediaLoad=!1,this.random=null,this.surfaceSamplerCache=null,this.surfacePointsCache=null,this.object=e}resetOnMove(){this.removeFromParent(),this.parent=null}removeFromParent(){return super.removeFromParent(),this.instancedMesh?.removeFromParent(),this}dispose(){this.removeFromParent(),this._disposeInstancedMesh(),this._invalidateBoolean()}_invalidateBoolean(){this.object instanceof r.v&&this.object.onClonerLayoutUpdated()}expandClones(e){if(null===this.parent)this.updateState(this.parameters,e);else{for(let e of this.children)e instanceof a.da&&e.expand();this._syncInstancedMesh()}}invalidateTransform(e){this.matrixWorldNeedsUpdate=!0}onObjUpdateMatrix(){"toObject"!==this.parameters.type&&(this.matrixWorldNeedsUpdate=!0)}update(e){switch(this._updateCount(e),this.parameters.type){case"radial":this._updateRadial(this.parameters,e);break;case"linear":this._updateLinear(this.parameters,e);break;case"grid":this._updateGrid(this.parameters,e);break;case"toObject":this._updateToObject(this.parameters,e)}for(let e of this.children){let t=e.transformOverride;void 0!==t&&(e.position.fromArray(t.position),e.rotation.fromArray(t.rotation),e.scale.fromArray(t.scale)),e.updateMatrix(),e.hasNonUniformScale&&(e.updateMatrixWorld(),e.updateMatrixWorldRigid())}this._syncInstancedMesh(),this._invalidateBoolean()}get instancingActive(){return void 0!==this.instancedMesh}get insideBoolean(){return null!==this.parent&&"booleanOp"in this.parent}_instancingEligible(){if(!0!==this.parameters.instanced)return!1;let e=this.object;return!(e.entityChildrenCount()>0||!0!==e.isMesh||(0,n.c)(e)||!0===e.isDecalObject)}_syncInstancedMesh(){if(!this._instancingEligible())return void this._disposeInstancedMesh();let e=this.instancedMesh;if(void 0!==e&&e.capacity<this.children.length&&(this._disposeInstancedMesh(),e=void 0),void 0===e){let t=Math.max(8,Math.ceil(1.5*this.children.length));e=this.instancedMesh=new V(this.object,t)}e.matrix=this.matrix,e.hiddenMatrix=this.hiddenMatrix,e.matrixWorldNeedsUpdate=!0,e.parent!==this.parent&&(e.removeFromParent(),this.parent?.add(e)),this.syncInstanceMatrices()}syncInstanceMatrices(){this._invalidateBoolean();let e=this.instancedMesh;if(void 0===e)return;let t=0;for(let i of this.children)!1!==i.playModeVisible&&(q.multiplyMatrices(i.hiddenMatrix,i.matrix).multiply(i.pivotMatrix),e.setMatrixAt(t++,q));e.count=t,e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null}_disposeInstancedMesh(){let e=this.instancedMesh;void 0!==e&&(this.instancedMesh=void 0,e.removeFromParent(),e.dispose())}_updateCount(e,t){let i;if(void 0!==t)i=t;else{let t=ec(this.parameters.grid.count,e);i="grid"===this.parameters.type?Math.round(t[0])*Math.round(t[1])*Math.round(t[2]):this.parameters.count}if("toObject"===this.parameters.type)if(this.parameters.toObject.object){if(void 0===t&&"random"!==this.parameters.toObject.spreadType)return}else i=0;if(this.children.length!==i)if(this.children.length<i)for(let e=0,t=i-this.children.length;e<t;++e){let e=new a.da(this.object);e.expand(),this.add(e)}else for(;this.children.length>i;){let e=this.children.pop();e.parent=null,e.dispatchEvent({type:"removed"}),this.dispatchEvent({type:"childremoved",child:e})}}getRandom(e,t=!1){return(null===this.random||this.random.data.seed!==e.seed||this.random.data.noiseType!==e.noiseType||this.random.is3D!==t)&&(this.random=new ep(e,t)),this.random}_updateRadial(e,t){let i,a=e.radial,r=a.start*l.Cc.DEG2RAD,s=r-a.end*l.Cc.DEG2RAD,n=ec(a.rotation,t),h=new l.Pc(n[0],n[1],n[2]);switch(a.axis){case"z":i=new l.Fc(0,0,1);break;case"y":i=new l.Fc(0,1,0);break;default:i=new l.Fc(1,0,0)}let d=e.randomnessObject??o.L.defaultData([1,1,1]).randomnessObject,c=!0===this.parameters.randomness&&0!==d.strength?this.getRandom(d):null,p=ec(a.scale,t),u=ec(a.position,t),f=ec(d.scale,t),m=ec(d.position,t),v=ec(d.rotation,t),x=s/e.count,y=T(d.strength,this.parameters.randomness);for(let[e,t]of this.children.entries()){let s=e*(d.freqScale/10)+d.movement,n=null===c?0:c.noise(s,s,s),o=e+1;t.scale.x=p[0]+y(o,_(n,f[0]))||1e-4,t.scale.y=p[1]+y(o,_(n,f[1]))||1e-4,t.scale.z=p[2]+y(o,_(n,f[2]))||1e-4;let l=x*e-r;switch(a.axis){default:case"x":el.set(0,l,0);break;case"y":el.set(0,0,l);break;case"z":el.set(l,0,0)}ea.copy(i).applyQuaternion(eh.setFromEuler(el)).multiplyScalar(a.radius),t.position.set(ea.x+(u[0]+y(o,_(n,m[0]))),ea.y+(u[1]+y(o,_(n,m[1]))),ea.z+(u[2]+y(o,_(n,m[2]))));let g=y(o,_(n,v[0])),b=y(o,_(n,v[1])),S=y(o,_(n,v[2]));!0===a.alignment?t.rotation.set(el.x+(h.x+g),el.y+(h.y+b),el.z+(h.z+S)):t.rotation.set(h.x+g,h.y+b,h.z+S)}}_updateLinear(e,t){if("linear"!==e.type)throw Error();let i=e.linear,a=ec(i.rotation,t),r=ec(i.scale,t),s=ec(i.position,t),n=new l.Pc(a[0]??0,a[1]??0,a[2]??0),h=e.randomnessObject??o.L.defaultData([1,1,1]).randomnessObject,d=ec(h.rotation,t),c=ec(h.scale,t),p=ec(h.position,t),u=!0===this.parameters.randomness&&0!==h.strength?this.getRandom(h):null,f=T(h.strength,this.parameters.randomness);for(let[e,t]of this.children.entries()){let i=e*(h.freqScale/10)+h.movement,a=null===u?0:u.noise(i,i,i),o=e+1,l=f(o,_(a,d[0])),m=f(o,_(a,d[1])),v=f(o,_(a,d[2]));t.scale.x=1+(r[0]-1)*e+f(o,_(a,c[0]))||1e-4,t.scale.y=1+(r[1]-1)*e+f(o,_(a,c[1]))||1e-4,t.scale.z=1+(r[2]-1)*e+f(o,_(a,c[2]))||1e-4,t.rotation.set(n.x*e+l,n.y*e+m,n.z*e+v),t.position.x=s[0]*e+f(o,_(a,p[0])),t.position.y=s[1]*e+f(o,_(a,p[1])),t.position.z=s[2]*e+f(o,_(a,p[2]))}}_updateGrid(e,t){let i=0,a=e.grid,r=e.randomnessObject??o.L.defaultData([1,1,1]).randomnessObject,s=ec(r.scale,t),n=ec(r.rotation,t),h=ec(r.position,t),d=!0===this.parameters.randomness&&0!==r.strength?this.getRandom(r,!0):null,c=T(r.strength,this.parameters.randomness),p=ec(a.count,t),u=ec(a.size,t);if(!0===a.useCenter){let e={x:p[0]%2==0?2:1,y:p[1]%2==0?2:1,z:p[2]%2==0?2:1},t=new l.Fc(u[0]*(p[0]-e.x)*.5,u[1]*(p[1]-e.y)*.5,u[2]*(p[2]-e.z)*.5);for(let e=0;e<p[0];e++)for(let a=0;a<p[1];a++)for(let o=0;o<p[2];o++){let l=this.children[i++];if(!l)continue;let p=null===d?0:d.noise((e+1)*(r.freqScale/10)+r.movement,(a+1)*(r.freqScale/10)+r.movement,(o+1)*(r.freqScale/10)+r.movement);l.scale.x=1+c(i,_(p,s[0]))||1e-4,l.scale.y=1+c(i,_(p,s[1]))||1e-4,l.scale.z=1+c(i,_(p,s[2]))||1e-4;let f=c(i,_(p,n[0])),m=c(i,_(p,n[1])),v=c(i,_(p,n[2]));l.rotation.set(f,m,v),l.position.x=u[0]*e-t.x+c(i,_(p,h[0])),l.position.y=u[1]*a-t.y+c(i,_(p,h[1])),l.position.z=u[2]*o-t.z+c(i,_(p,h[2]))}}else for(let e=0;e<p[0];e++)for(let t=0;t<p[1];t++)for(let a=0;a<p[2];a++){let o=this.children[i++];if(!o)continue;let l=null===d?0:d.noise((e+1)*(r.freqScale/10)+r.movement,(t+1)*(r.freqScale/10)+r.movement,(a+1)*(r.freqScale/10)+r.movement);o.scale.x=1+c(i,_(l,s[0]))||1e-4,o.scale.y=1+c(i,_(l,s[1]))||1e-4,o.scale.z=1+c(i,_(l,s[2]))||1e-4;let p=c(i,_(l,n[0])),f=c(i,_(l,n[1])),m=c(i,_(l,n[2]));o.rotation.set(p,f,m),o.position.x=u[0]*e+c(i,_(l,h[0])),o.position.y=-u[1]*t+c(i,_(l,h[1])),o.position.z=-u[2]*a+c(i,_(l,h[2]))}}_updateToObject(e,a){if("toObject"!==e.type)throw Error();let{toObject:r}=e,s=ec(r.rotation,a),n=ec(r.position,a),h=ec(r.scale,a),c=new l.Pc(s[0],s[1],s[2]),p=e.randomnessObject??o.L.defaultData([1,1,1]).randomnessObject,u=ec(p.rotation,a),f=ec(p.position,a),m=ec(p.scale,a),v=!0===this.parameters.randomness&&0!==p.strength?this.getRandom(p):null,x=T(p.strength,this.parameters.randomness);if(!r.object){for(let[,e]of this.children.entries())e.position.set(0,0,0),e.scale.setScalar(1),e.rotation.set(0,0,0);return this.objectForSample=void 0,void this.invalidateSurfaceCaches()}if(!this.objectForSample)return;if(this.objectForSample instanceof t.a){if(!this.objectForSample.font?.isLoaded||void 0===this.objectForSample.geometry.attributes.position)return void(this._pendingMediaLoad=!0);this._pendingMediaLoad=!1}if(void 0===this.objectForSample.geometry&&this.objectForSample.isAncestorOf(this.object.uuid))return void console.warn(`Oh no! The object "${this.object.name}" (${this.object.uuid}) seem to be a child/descendant of the object it's being cloned to. Please re-parent it so that they are siblings instead.`);let y=this.getSubdivData();if(y.length>0){let e=Math.round(y.length*r.count/100);this._updateCount(a,e)}else{let e=this.objectForSample.geometry.getAttribute("position");if(!e||isNaN(e.count)||0===e.count)return void console.warn(`Oh no! The object "${this.object.name}" (${this.object.uuid}) cannot be cloned on the surface of "${this.objectForSample.name}" (${this.objectForSample.uuid}) because the latter does not have a valid geometry.`)}this.objectForSample.updateMatrixWorld();let g="random"===r.spreadType,b=null;g&&(b=this.getSurfaceSampler()).setRandomGenerator((0,d.default)(this.object.uuid+r.seed));let w=S[r.axis],P=this.children;Y.fromArray(w),H.copy(this.object.hiddenMatrix).invert();let M=this.objectForSample instanceof i.b;for(let[e,t]of(M&&G.copy(this.objectForSample.matrixWorld).invert(),"normal"!==r.align&&this.object.getWorldDirection(ei),en.set(Y.y,Y.z,Y.x).normalize(),eo.copy(en).cross(Y).normalize(),$.makeBasis(en,Y,eo).invert(),P.entries())){let i=e*(p.freqScale/10)+p.movement,a=null===v?0:v.noise(i,i,i),s=e+1,o=x(s,_(a,u[0])),l=x(s,_(a,u[1])),d=x(s,_(a,u[2]));g?b.sample(Q,ee):(y.length&&(Q.fromArray(y[e].pos),ee.fromArray(y[e].norm)),M&&Q.applyMatrix4(G)),Q.applyMatrix4(H),t.position.copy(Q);let S="normal"===r.align?ee:ei,w=J.fromArray(n);J.x+=x(s,_(a,f[0])),J.y+=x(s,_(a,f[1])),J.z+=x(s,_(a,f[2]));let T=Math.acos(S.dot(Y)),P=et.crossVectors(Y,S).normalize(),z=X.makeRotationAxis(P,T);er.copy(S).cross(this.object.up).normalize(),es.copy(er).cross(S).normalize(),K.makeBasis(er,S,es),Z.multiplyMatrices(K,$),el.setFromRotationMatrix(Z),w.applyMatrix4(z),t.position.add(w),t.rotation.set(el.x+c.x+o,el.y+c.y+l,el.z+c.z+d),t.scale.set(1+h[0]+x(s,_(a,m[0]))||1e-4,1+h[1]+x(s,_(a,m[1]))||1e-4,1+h[2]+x(s,_(a,m[2]))||1e-4),t.scale.multiply(this.object.scale),t.hiddenMatrix=this.object.hiddenMatrix}}getSurfaceSampler(){let e=this.objectForSample,t=e.geometry,i=t.getAttribute("position"),a=t.index,r=this.surfaceSamplerCache;if(null!==r&&r.geometry===t&&r.position===i&&r.positionVersion===ed(i)&&r.index===a&&r.indexVersion===(null===a?-1:a.version))return r.sampler;let s=new b(e).build();return this.surfaceSamplerCache={geometry:t,position:i,positionVersion:ed(i),index:a,indexVersion:null===a?-1:a.version,sampler:s},s}invalidateSurfaceCaches(){this.surfaceSamplerCache=null,this.surfacePointsCache=null}getSubdivData(){if(!this.objectForSample)return[];let e=this.parameters.toObject.spreadType;if("random"===e)return[];let t=this.objectForSample instanceof i.b,a=this.objectForSample.geometry;if(!t&&a){let t=this.surfacePointsCache,i=a.getAttribute("position");if(null!==t&&t.spreadType===e&&t.geometry===a&&t.position===i&&t.positionVersion===ed(i)&&t.index===a.index&&t.indexVersion===(null===a.index?-1:a.index.version))return t.points}let r=new Map,s=(e,t)=>{let i=Math.round(1e4*e[0])+"_"+Math.round(1e4*e[1])+"_"+Math.round(1e4*e[2]),a=r.get(i);a?(a.pos[0]+=e[0],a.pos[1]+=e[1],a.pos[2]+=e[2],a.norm[0]+=t[0],a.norm[1]+=t[1],a.norm[2]+=t[2],a.count+=1):r.set(i,{pos:[...e],norm:[...t],count:1})};if(t){let t=this.objectForSample,i=w[e],a=A[i],r=L[i],n=k[i],o=a(t.subdivPointerNew);for(let e=0;e<=o-1;e++){let i=r(t.subdivPointerNew,e),a=n(t.subdivPointerNew,e);j.fromArray(i).applyMatrix4(t.matrixWorld),W.fromArray(a),s(j.toArray(),W.toArray())}}else(a.index?function(e){let t=[],i=Math.floor(e.index.count/3);for(let a=0;a<i;a++)if(U.fromArray(e.index.array,3*a),D.setFromAttributeAndIndices(e.attributes.position,U.x,U.y,U.z),D.getNormal(E),D.getMidpoint(C),!(isNaN(C.x)||isNaN(C.y)||isNaN(C.z))){let{a:e,b:i,c:a}=D,r=e.toArray(),s=i.toArray(),n=a.toArray(),o=e.distanceTo(i),l=i.distanceTo(a),h=a.distanceTo(e),d=R(r,s),c=R(s,n),p=R(n,r),u=[o,l,h],f=Math.max(...u),m=u.filter(e=>Math.round(e)===Math.round(f)).length>1,v=[],x=D.getMidpoint(C).toArray();f!==o||m||(v=[c,p,p],x=d),f!==l||m||(v=[d,p,p],x=c),f!==h||m||(v=[d,c,c],x=p),m&&(v=[d,c,p]),t.push({vertices:[r,s,n],faceCenters:v,midpoint:x,norm:D.getNormal(E).toArray()})}return t}(a):function(e){let t=[],{position:i}=e.attributes;for(let e=0;e<i.count;e++){D.setFromAttributeAndIndices(i,3*e,3*e+1,3*e+2),D.getNormal(E),D.getMidpoint(C);let a=D.a.toArray(),r=D.b.toArray(),s=D.c.toArray();t.push({vertices:[a,r,s],faceCenters:[R(a,r),R(r,s),R(s,a)],midpoint:C.toArray(),norm:E.toArray()})}return t}(a)).forEach((t,i)=>{"polygon_center"===e&&s(t.midpoint,t.norm),"vertex"===e&&(s(t.vertices[0],t.norm),s(t.vertices[1],t.norm),s(t.vertices[2],t.norm)),"edge"===e&&(s(t.faceCenters[0],t.norm),s(t.faceCenters[1],t.norm),s(t.faceCenters[2],t.norm))});let n=Array.from(r.values());for(let e of n)e.pos[0]/=e.count,e.pos[1]/=e.count,e.pos[2]/=e.count,e.norm[0]/=e.count,e.norm[1]/=e.count,e.norm[2]/=e.count;if(!t&&a){let t=a.getAttribute("position");this.surfacePointsCache={spreadType:e,geometry:a,position:t,positionVersion:ed(t),index:a.index,indexVersion:null===a.index?-1:a.index.version,points:n}}return n}updateState(e,t){if(this.parameters=(0,s.c)(e),"toObject"!==this.parameters.type)this.invalidateSurfaceCaches(),(null===this.parent||this.parent!==this.object)&&(this.removeFromParent(),this.object.parent?.add(this),this.matrix=this.object.matrix,this.hiddenMatrix=this.object.hiddenMatrix,this.matrixWorldNeedsUpdate=!0,this.matrixAutoUpdate=!1);else if(null===this.parent||this.parent.uuid!==this.parameters.toObject.object){this.removeFromParent(),this.invalidateSurfaceCaches();let e=t.scene.find(this.parameters.toObject.object);this.objectForSample=e instanceof r.v?e:void 0,this.matrix=new l.Oc,this.hiddenMatrix=new l.Oc,this.matrixWorldNeedsUpdate=!0,this.matrixAutoUpdate=!1,e&&e.add(this)}this.update(t)}get pendingMediaLoad(){return this._pendingMediaLoad}};e.s(["a",0,eu])}]);