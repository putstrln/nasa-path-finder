/* eslint-disable */

function parse_3d_file(filename, s) {
	//determine type of file
	switch (filename.split('.').pop().toLowerCase()) {
		case "stl":
			return parse_stl_bin(s);
			break;
		case "obj":
			return parse_obj(s);
			break;
		case "vf":
			return parse_vf(arrayBufferToString(s));
			break;
		default:
			return "Unknown file type";
	}
}

function arrayBufferToString(buffer, onSuccess, onFail) {
	const bufView = new Uint8Array(buffer);
	const length = bufView.length;
	let result = '';
	for (let i = 0; i < length; i += 65535) {
		let addition = 65535;
		if (i + 65535 > length) {
			addition = length - i;
		}
		result += String.fromCharCode.apply(null, bufView.subarray(i, i + addition));
	}
	if (result) {
		if (onSuccess)
			onSuccess(result);
	} else {
		if (onFail)
			onFail('buffer was invalid');
	}

	return result;

}

function parse_obj(s) {
	const obj_string = arrayBufferToString(s);


	function vector(x, y, z) {

		return new THREE.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));

	}

	function uv(u, v) {

		return new THREE.Vector2(parseFloat(u), parseFloat(v));

	}

	function face3(a, b, c, normals) {

		return new THREE.Face3(a, b, c, normals);

	}

	const object = new THREE.Object3D();
	var geometry;
	let material;
	let mesh;

	function parseVertexIndex(index) {

		index = parseInt(index);

		return index >= 0 ? index - 1 : index + vertices.length;

	}

	function parseNormalIndex(index) {

		index = parseInt(index);

		return index >= 0 ? index - 1 : index + normals.length;

	}

	function parseUVIndex(index) {

		index = parseInt(index);

		return index >= 0 ? index - 1 : index + uvs.length;

	}

	function add_face(a, b, c, normals_inds) {

		if (!normals_inds) {

			geometry.faces.push(face3(
				vertices[parseVertexIndex(a)] - 1,
				vertices[parseVertexIndex(b)] - 1,
				vertices[parseVertexIndex(c)] - 1
			));

		} else {

			geometry.faces.push(face3(
				vertices[parseVertexIndex(a)] - 1,
				vertices[parseVertexIndex(b)] - 1,
				vertices[parseVertexIndex(c)] - 1, [
					normals[parseNormalIndex(normals_inds[0])].clone(),
					normals[parseNormalIndex(normals_inds[1])].clone(),
					normals[parseNormalIndex(normals_inds[2])].clone()
				]
			));

		}

	}

	function add_uvs(a, b, c) {

		geometry.faceVertexUvs[0].push([
			uvs[parseUVIndex(a)].clone(),
			uvs[parseUVIndex(b)].clone(),
			uvs[parseUVIndex(c)].clone()
		]);

	}

	function handle_face_line(faces, uvs, normals_inds) {

		if (faces[3] === undefined) {

			add_face(faces[0], faces[1], faces[2], normals_inds);

			if (uvs !== undefined && uvs.length > 0) {

				add_uvs(uvs[0], uvs[1], uvs[2]);

			}

		} else {

			if (normals_inds !== undefined && normals_inds.length > 0) {

				add_face(faces[0], faces[1], faces[3], [normals_inds[0], normals_inds[1], normals_inds[3]]);
				add_face(faces[1], faces[2], faces[3], [normals_inds[1], normals_inds[2], normals_inds[3]]);

			} else {

				add_face(faces[0], faces[1], faces[3]);
				add_face(faces[1], faces[2], faces[3]);

			}

			if (uvs !== undefined && uvs.length > 0) {

				add_uvs(uvs[0], uvs[1], uvs[3]);
				add_uvs(uvs[1], uvs[2], uvs[3]);

			}

		}

	}

	// create mesh if no objects in text

	if (/^o /gm.test(obj_string) === false) {
		geometry = new THREE.Geometry();
	}

	var vertices = [];
	var normals = [];
	var uvs = [];

	// v float float float

	const vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

	// vn float float float

	const normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

	// vt float float

	const uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

	// f vertex vertex vertex ...

	const face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

	// f vertex/uv vertex/uv vertex/uv ...

	const face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

	// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

	const face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

	// f vertex//normal vertex//normal vertex//normal ...

	const face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;

	//

	const lines = obj_string.split('\n');

	for (var i = 0; i < lines.length; i++) {

		let line = lines[i];
		line = line.trim();

		let result;

		if (line.length === 0 || line.charAt(0) === '#') {

			continue;

		} else if ((result = vertex_pattern.exec(line)) !== null) {

			// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

			vertices.push(
				geometry.vertices.push(
					vector(
						result[1], result[2], result[3]
					)
				)
			);

		} else if ((result = normal_pattern.exec(line)) !== null) {

			// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

			normals.push(
				vector(
					result[1], result[2], result[3]
				)
			);

		} else if ((result = uv_pattern.exec(line)) !== null) {

			// ["vt 0.1 0.2", "0.1", "0.2"]

			uvs.push(
				uv(
					result[1], result[2]
				)
			);

		} else if ((result = face_pattern1.exec(line)) !== null) {

			// ["f 1 2 3", "1", "2", "3", undefined]

			handle_face_line(
				[result[1], result[2], result[3], result[4]]
			);

		} else if ((result = face_pattern2.exec(line)) !== null) {

			// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

			handle_face_line(
				[result[2], result[5], result[8], result[11]], //faces
				[result[3], result[6], result[9], result[12]] //uv
			);

		} else if ((result = face_pattern3.exec(line)) !== null) {

			// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

			handle_face_line(
				[result[2], result[6], result[10], result[14]], //faces
				[result[3], result[7], result[11], result[15]], //uv
				[result[4], result[8], result[12], result[16]] //normal
			);

		} else if ((result = face_pattern4.exec(line)) !== null) {

			// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

			handle_face_line(
				[result[2], result[5], result[8], result[11]], //faces
				[], //uv
				[result[3], result[6], result[9], result[12]] //normal
			);

		} else if (/^o /.test(line)) {

			geometry = new THREE.Geometry();

		} else if (/^g /.test(line)) {

			// group

		} else if (/^usemtl /.test(line)) {

			// material

			//material.name = line.substring( 7 ).trim();

		} else if (/^mtllib /.test(line)) {

			// mtl file

		} else if (/^s /.test(line)) {

			// smooth shading

		} else {

			// console.log( "THREE.OBJLoader: Unhandled line " + line );

		}

	}

	const children = object.children;

	for (const i = 0, l = children.length; i < l; i++) {

		var geometry = children[i].geometry;

	}

	//return object;

	return ({
		vertices: geometry.vertices,
		faces: geometry.faces,
		colors: false
	});
}


function parse_stl_ascii(s) {
	try {
		let stl_string = arrayBufferToString(s);

		const vertices = [];
		const faces = [];
		const vert_hash = {};

		stl_string = stl_string.replace(/\r/, "\n");
		stl_string = stl_string.replace(/^solid[^\n]*/, "");
		stl_string = stl_string.replace(/\n/g, " ");
		stl_string = stl_string.replace(/facet normal /g, "");
		stl_string = stl_string.replace(/outer loop/g, "");
		stl_string = stl_string.replace(/vertex /g, "");
		stl_string = stl_string.replace(/endloop/g, "");
		stl_string = stl_string.replace(/endfacet/g, "");
		stl_string = stl_string.replace(/endsolid[^\n]*/, "");
		stl_string = stl_string.replace(/facet/g, "");
		stl_string = stl_string.replace(/\s+/g, " ");
		stl_string = stl_string.replace(/^\s+/, "");

		const facet_count = 0;
		let block_start = 0;
		let vertex;
		let vertexIndex;
		const points = stl_string.split(" ");
		let face_indices = [];
		const len = points.length / 12 - 1;

		for (let i = 0; i < len; i++) {
			face_indices = [];
			for (let x = 0; x < 3; x++) {
				f1 = parseFloat(points[block_start + x * 3 + 3]);
				f2 = parseFloat(points[block_start + x * 3 + 4]);
				f3 = parseFloat(points[block_start + x * 3 + 5]);
				vertexIndex = vert_hash[[f1, f2, f3]];
				if (vertexIndex == null) {
					vertexIndex = vertices.length;
					vertices.push(new THREE.Vector3(f1, f2, f3));
					vert_hash[[f1, f2, f3]] = vertexIndex;
				}

				face_indices.push(vertexIndex);
			}
			faces.push(new THREE.Face3(face_indices[0], face_indices[1], face_indices[2]));

			block_start = block_start + 12;
		}

		return ({
			vertices,
			faces,
			colors: false
		});
	} catch (err) {
		return "Can't parse file";
		//return "ERROR: "+err.message;
	}

}

function parse_stl_bin(s) {
	const vertices = [];
	const faces = [];
	let vert_hash = {};
	let vertexIndex;
	let f1;
	let f2;
	let f3;
	let v1;
	let v2;
	let v3;

	//see if this is colored STL
	const cpos = arrayBufferToString(s.slice(0, 80)).toLowerCase().indexOf("color");

	const fdata = new DataView(s, 0);
	let only_default_color = true;

	if (cpos > -1) {
		//there is a color, get the default color
		def_red_color = fdata.getUint8(cpos + 6, true);
		def_green_color = fdata.getUint8(cpos + 7, true);
		def_blue_color = fdata.getUint8(cpos + 8, true);
	}


	let pos = 80;

	try {
		var tcount = fdata.getUint32(pos, true);
	} catch (err) {
		return "Can't parse file";
		//return "ERROR: "+err.message;
	}

	//check if we're binary or ascii - comparing the actual file size to the "what is written in the file" file size
	const predictedSize = 80 /* header */ + 4 /* count */ + 50 * tcount;
	if (!(s.byteLength == predictedSize)) return parse_stl_ascii(s);


	try {

		pos += 4;
		while (tcount--) {
			pos += 12;

			f1 = fdata.getFloat32(pos, true);
			f2 = fdata.getFloat32(pos + 4, true);
			f3 = fdata.getFloat32(pos + 8, true);
			vertexIndex = vert_hash[[f1, f2, f3]];
			if (vertexIndex == null) {
				vertexIndex = vertices.length;
				vertices.push(new THREE.Vector3(f1, f2, f3));
				vert_hash[[f1, f2, f3]] = vertexIndex;
			}
			v1 = vertexIndex;

			pos += 12;

			f1 = fdata.getFloat32(pos, true);
			f2 = fdata.getFloat32(pos + 4, true);
			f3 = fdata.getFloat32(pos + 8, true);
			vertexIndex = vert_hash[[f1, f2, f3]];
			if (vertexIndex == null) {
				vertexIndex = vertices.length;
				vertices.push(new THREE.Vector3(f1, f2, f3));
				vert_hash[[f1, f2, f3]] = vertexIndex;
			}
			v2 = vertexIndex;

			pos += 12;

			f1 = fdata.getFloat32(pos, true);
			f2 = fdata.getFloat32(pos + 4, true);
			f3 = fdata.getFloat32(pos + 8, true);
			vertexIndex = vert_hash[[f1, f2, f3]];
			if (vertexIndex == null) {
				vertexIndex = vertices.length;
				vertices.push(new THREE.Vector3(f1, f2, f3));
				vert_hash[[f1, f2, f3]] = vertexIndex;
			}
			v3 = vertexIndex;

			if (cpos > -1) {
				pos += 12;

				//get 2 bytes of color (if any)
				face_color = fdata.getUint16(pos, true);

				if ((face_color == 32768) || (face_color == 65535)) {
					//default color
					color_red = def_red_color;
					color_green = def_green_color;
					color_blue = def_blue_color;
				} else {
					only_default_color = false;
					color_red = Math.ceil((face_color & 31) * 8.2258); //0000000000011111
					color_green = Math.ceil(((face_color & 992) >> 5) * 8.2258); //0000001111100000
					color_blue = Math.ceil(((face_color & 31744) >> 10) * 8.2258); //0111110000000000

					//the rgb are saved in values from 0 to 31 ... for us, we want it to be 0 to 255 - hence the 8.2258)
				}

				faces.push(new THREE.Face3(v1, v2, v3, 1, new THREE.Color(`rgb(${color_red},${color_green},${color_blue})`)));

				pos += 2;
			} else {
				//no color
				faces.push(new THREE.Face3(v1, v2, v3));
				pos += 14;
			}
		}

		vert_hash = null;

		return ({
			vertices,
			faces,
			colors: ((cpos > -1) && (!only_default_color))
		});
	} catch (err) {
		return "Can't parse file";
		//return "ERROR: "+err.message;
	}
}

function parse_vf(s) {
	const o = JSON.parse(s);

	const vertices = [];
	const faces = [];

	try {
		var len = o.vertices.length;
		for (i = 0; i < len; i++)
			vertices.push(new THREE.Vector3(o.vertices[i][0], o.vertices[i][1], o.vertices[i][2]));

		var len = o.faces.length;
		for (i = 0; i < len; i++)
			faces.push(new THREE.Face3(o.faces[i][0], o.faces[i][1], o.faces[i][2]));

		return ({
			vertices,
			faces,
			colors: false
		});
	} catch (err) {
		return "Can't parse file";
	}

}

function geo_to_vf(geo) {
	const vertices = [];
	const faces = [];

	var len = geo.vertices.length;
	for (i = 0; i < len; i++)
		vertices.push([geo.vertices[i].x, geo.vertices[i].y, geo.vertices[i].z]);

	var len = geo.faces.length;
	for (i = 0; i < len; i++)
		faces.push([geo.faces[i].a, geo.faces[i].b, geo.faces[i].c]);


	return ({
		vertices,
		faces,
		colors: false
	});
}

if (!ArrayBuffer.prototype.slice) {
	//Returns a new ArrayBuffer whose contents are a copy of this ArrayBuffer's
	//bytes from `begin`, inclusive, up to `end`, exclusive
	ArrayBuffer.prototype.slice = function(begin, end) {
		//If `begin` is unspecified, Chrome assumes 0, so we do the same
		if (begin === void 0) {
			begin = 0;
		}

		//If `end` is unspecified, the new ArrayBuffer contains all
		//bytes from `begin` to the end of this ArrayBuffer.
		if (end === void 0) {
			end = this.byteLength;
		}

		//Chrome converts the values to integers via flooring
		begin = Math.floor(begin);
		end = Math.floor(end);

		//If either `begin` or `end` is negative, it refers to an
		//index from the end of the array, as opposed to from the beginning.
		if (begin < 0) {
			begin += this.byteLength;
		}
		if (end < 0) {
			end += this.byteLength;
		}

		//The range specified by the `begin` and `end` values is clamped to the
		//valid index range for the current array.
		begin = Math.min(Math.max(0, begin), this.byteLength);
		end = Math.min(Math.max(0, end), this.byteLength);

		//If the computed length of the new ArrayBuffer would be negative, it
		//is clamped to zero.
		if (end - begin <= 0) {
			return new ArrayBuffer(0);
		}

		const result = new ArrayBuffer(end - begin);
		const resultBytes = new Uint8Array(result);
		const sourceBytes = new Uint8Array(this, begin, end - begin);

		resultBytes.set(sourceBytes);

		return result;
	};
}
