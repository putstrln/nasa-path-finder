var is_ie = !!window.MSStream;
			var waiting=false;
			var mesh=null;
			var material=new THREE.MeshLambertMaterial({color:0x909090, overdraw: 1, wireframe: false, shading:THREE.FlatShading, vertexColors: THREE.FaceColors});
			var mesh_is_ready=false;
			var colored_model=false;

			if (!is_ie)
				//double side not supported on IE
				material.side = THREE.DoubleSide;

			var cancel_download=false;
			var cancel_3dp=false;
			var max_file_size=40000000;
			var mesh_color='#909090';

			var xsize=0;
			var ysize=0;
			var zsize=0;
			var vol=0;
			var area=0;
			var triangles_count=0;
			var model_filename='';
			var view_units=1; //mm
			var file_units=1; //mm
			var bg_color=0xffffff;
			var deg90=Math.PI / 2;
			var orientation="front";
			var egh=null; //for edges
			var has_edges=false;
			var url_is_local=false;

			function $id(id)
			{
				return document.getElementById(id);
			}

			function set_orientation(ovalue)
			{
				orientation=ovalue;
				if (!mesh) return;

				mesh.rotation.x=0;
				mesh.rotation.y=0;
				mesh.rotation.z=0;

				switch (ovalue)
				{
					case "right":
						//right - rotate -90 deg. around axis y
						mesh.rotateY(-deg90);
						break;

					case "left":
						//right - rotate 90 deg. around axis y
						mesh.rotateY(deg90);
						break;

					case "top":
						//top - rotate 90 deg. around axis x
						mesh.rotateX(deg90);
						break;

					case "bottom":
						//top - rotate -90 deg. around axis x
						mesh.rotateX(-deg90);
						break;

					case "back":
						//top - rotate 180 deg. around axis Y
						mesh.rotateY(deg90*2);
						break;

					default:
						//Front / do nothing
				}

				if (mesh_is_ready)
					mesh.geometry.verticesNeedUpdate = true;
			}

			function set_edges(b)
			{
				has_edges=b;
				if (mesh==null) return;
				if (has_edges)
				{
					egh = new THREE.EdgesHelper( mesh, 0x000000 );
					egh.material.linewidth = 1;
					scene.add( egh );
				}
				else
					remove_edges();
			}

			function set_local(b)
			{
				url_is_local=b;
				if (mesh==null) return;
			}

			function remove_edges()
			{
				if (egh) scene.remove( egh );
				egh=null;
			}

			function set_view_units(v)
			{
				view_units=v;
				$id("vunits").innerHTML=v=="1"?"mm":"in";
				setCookie("units", v=="1"?"mm":"in", 1000);
				recalc_units();
			}

			function set_file_units(v)
			{
				file_units=v;
				recalc_units();
			}

			function recalc_units()
			{
								if (file_units==view_units)
					set_vol_and_size(vol, xsize, ysize, zsize);
				else if (file_units==1)
					//file in mm, view in inches
					set_vol_and_size(vol/16387.064, xsize/25.4, ysize/25.4, zsize/25.4);
				else
					//file in inches, view in mm
					set_vol_and_size(vol*16387.064, xsize*25.4, ysize*25.4, zsize*25.4);
							}


			function geo_to_vf(geo)
			{
				var vertices=[];
				var faces=[];

				var len=geo.vertices.length;
				for (i=0;i<len;i++)
					vertices.push([geo.vertices[i].x,geo.vertices[i].y,geo.vertices[i].z]);

				var len=geo.faces.length;
				for (i=0;i<len;i++)
				{
					var a=[geo.faces[i].a,geo.faces[i].b,geo.faces[i].c];
					if (colored_model)
						a.push({r:geo.faces[i].color.r,g:geo.faces[i].color.g,b:geo.faces[i].color.b});

					faces.push(a);
				}


				//console.log(faces);
				return ({vertices:vertices, faces:faces});
			}

			function send_to_ts()
			{
				if (waiting) return;
				if (!mesh) return;

				cancel_3dp=false;
				var pbar=$id('pbar_3dp');
				pbar.value=0;
				pbar.style.visibility='visible';
				$id('pwait_txt').innerHTML="Preparing file for 3D Printing";
				$id('c3dp').style.visibility='visible';
				$id('wtext').style.height="80px";
				$id('pwait').style.display='block';

				var xhr = new XMLHttpRequest();
				// progress bar
				xhr.upload.addEventListener("progress",
					function(e)
					{
						if (cancel_3dp)
						{
							xhr.abort();
							return;
						}

						pbar.value=e.loaded / e.total;
						if (pbar.value>0.99)
						{
							$id('pwait_txt').innerHTML="Sending file to 3D Printing service";
							$id('c3dp').style.visibility='hidden'; //no rollback from here!
							pbar.style.visibility='hidden';
							$id('wtext').style.height="35px";
						}
					}
				, false);

				// file received/failed
				xhr.onreadystatechange =
					function(e)
					{
						if (xhr.readyState == 4)
						{
							//alert(xhr.responseText);return;
							pbar.value=1;
							if (xhr.responseText.substr(0,2)=="OK")
							{
								window.location=xhr.responseText.substr(2);
							}
							else
							{
								if (!cancel_3dp) //if user canceled so that's no error. probably. doens't matter.
									alert('Error preparing file for 3D Print');
							}

							$id('pwait').style.display='none';
						}
					};

				// start upload

				xhr.open("POST", "/3dprint/prepare_3dp.php", true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send("vf="+JSON.stringify(geo_to_vf(mesh.geometry))+"&target=treatstock"+"&units="+file_units+"&on="+model_filename);
			}


			function do_resize()
			{
				var height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
				var width = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
								height=Math.min(height,width-150);
				$id('cjc').style.height=(height-220)+'px';
				$id('cjc').style.width=(height-220)+'px';
				$id('cjcwrap').style.height=(height-220)+'px';
				$id('cjcwrap').style.width=(height-220)+'px';
				$id('cjcdrag').style.top=((height-320)/2)+'px';
				$id('cjcdrag').style.left=((height-570)/2)+'px';
				$id('cjcpbar').style.top=((height-345)/2)+'px';
				$id('cjcpbar').style.left=((height-570)/2)+'px';
				$id('cjcproc').style.top=((height-345)/2)+'px';
				$id('cjcproc').style.left=((height-570)/2)+'px';

				var rsize_width=$id("cjcwrap").getBoundingClientRect().width;
				var rsize_height=$id("cjcwrap").getBoundingClientRect().height;
				renderer.setSize(rsize_width-5, rsize_height-5);
			}

			function handleDragOver(e)
			{
				if (waiting) return;

				e.stopPropagation();
				e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
			}

			function handleFileDrop(e)
			{
				e.stopPropagation();
				e.preventDefault();

				if (waiting) return;

				//first, check if its a file
				if (e.dataTransfer.files.length>0)
				{
					if (e.dataTransfer.files[0].size>max_file_size)
					{
						alert('File is too big - maximum allowed size is 35mb');
						return false;
					}

					if (!supported_file_type(e.dataTransfer.files[0].name))
					{
						alert('File type is not supported');
						return false;
					}
					read_file(e.dataTransfer.files[0]);
				}

				else if (typeof e.dataTransfer.getData("Text") === 'string')
				{
					//check - maybe a url?
					read_from_url(e.dataTransfer.getData("Text"));
				}
			}

			function supported_file_type (filename)
			{
				switch (filename.split('.').pop().toLowerCase())
				{
					case 'stl':
					case 'obj':
					case 'vf':
						return true;
						break;

					default:
						return false;
				}

			}

			function switch_view(v)
			{
				$id('cjcdrag').style.display=((v=='drag')?'block':'none');
				$id('cjcpbar').style.display=((v=='pbar')?'block':'none');
				$id('cjcproc').style.display=((v=='proc')?'block':'none');
				$id('cjc').style.display=((v=='cjc')?'block':'none');
			}

			function after_error()
			{
				switch_view('drag');
				cancel_download=false;
				waiting=false;
				return false;
			}


			function after_file_load(filename, s)
			{
				var vf_data;

				try
				{
					vf_data=parse_3d_file(filename, s);
				}
				catch(err)
				{
					vf_data="Error parsing the file";
				}

				if (typeof vf_data === 'string')
				{
					alert(vf_data);
					switch_view('drag');
					waiting=false;
					return;
				}

				mesh_is_ready=false;

				if (mesh!=null) {scene.remove(mesh);mesh=null};

				var geo=new THREE.Geometry;
				geo.vertices=vf_data.vertices;
				geo.faces=vf_data.faces;
				geo.computeBoundingBox();

				geo.computeCentroids();
				geo.computeFaceNormals();
				geo.computeVertexNormals();
				THREE.GeometryUtils.center(geo);
				mesh = new THREE.Mesh(geo, material);


				if (vf_data.colors)
				{
					set_color($id('white_color'),'#FFFFFF');
					colored_model=true;
				}
				else
					colored_model=false;

				update_mesh_color();

				//renderer.setClearColor(bg_color, 0); //background
				set_color(null, bg_color, true); //background

								$id("sel_orientation").selectedIndex=0; //front

				scene.add(mesh);
				mesh_is_ready=true;

				directionalLight.position.x = geo.boundingBox.min.y * 2;
				directionalLight.position.y = geo.boundingBox.min.y * 2;
				directionalLight.position.z = geo.boundingBox.max.z * 2;

				pointLight.position.x = (geo.boundingBox.min.y+geo.boundingBox.max.y)/2;
				pointLight.position.y = (geo.boundingBox.min.y+geo.boundingBox.max.y)/2;
				pointLight.position.z = geo.boundingBox.max.z * 2;

				camera.position.set(0,0,Math.max(geo.boundingBox.max.x*3,geo.boundingBox.max.y*3,geo.boundingBox.max.z*3));
				controls.reset();
				switch_view('cjc');

				if (has_edges) set_edges(true);

				xsize=geo.boundingBox.max.x-geo.boundingBox.min.x;
				ysize=geo.boundingBox.max.y-geo.boundingBox.min.y;
				zsize=geo.boundingBox.max.z-geo.boundingBox.min.z;
				vol_area=calc_vol_and_area(geo);
				vol=vol_area[0];
				area=vol_area[1];
				triangles_count=geo.faces.length;
				model_filename=filename;


								guess_file_units(xsize,ysize,zsize);
				recalc_units();

				$id('ifilename').innerHTML=filename.substr(0,20);
				$id('ifilename').style.visibility='visible';

				setTimeout(function(){$id('statswrap').style.width='280px';$id('statswrap').style.height='auto';}, 500);


				//$id('cjcwrap').addEventListener('dragover', handleDragOver, false);
				//$id('cjcwrap').addEventListener('drop', handleFileDrop, false);

				waiting=false;
			}

			function set_color_by_name(color, is_bg_color)
			{
				is_bg_color=is_bg_color||false;
				switch (color.toLowerCase())
				{
					case "black":		set_color($id('black_color'),'#000000',is_bg_color); break;
					case "white":		set_color($id('white_color'),'#FFFFFF',is_bg_color); break;
					case "blue":		set_color($id('blue_color'),'#0000FF',is_bg_color); break;
					case "green":		set_color($id('green_color'),'#00FF00',is_bg_color); break;
					case "red":			set_color($id('red_color'),'#FF0000',is_bg_color); break;
					case "yellow":		set_color($id('yellow_color'),'#FFFF00',is_bg_color); break;
					case "gray":		set_color($id('gray_color'),'#909090',is_bg_color); break;
					case "azure":		set_color($id('azure_color'),'#00FFFF',is_bg_color); break;
					case "pink":		set_color($id('pink_color'),'#FF00FF',is_bg_color); break;
					case "purple":		set_color($id('purple_color'),'#703487',is_bg_color); break;
					case "darkblue":	set_color($id('darkblue_color'),'#102075',is_bg_color); break;
					case "brown":		set_color($id('brown_color'),'#654321',is_bg_color); break;
					case "transparent": set_color($id('white_color'),'transparent',true); break;
					default:
						//any valid color value goes
						if (/^#[0-9A-F]{6}$/i.test(color))
							set_color($id('white_color'),color,is_bg_color);
				}
			}


			function set_color(o, o_color, is_bg_color)
			{
				is_bg_color=is_bg_color||false;

				if (is_bg_color)
				{
					bg_color=o_color;
					if (o_color=='transparent')
						renderer.setClearColor(0x000000, 0);
					else
						renderer.setClearColor(o_color, 1);
					return;
				}

								c = $id('cpal').getElementsByTagName("div");

				var i=c.length;
				while(i--)
				{
					if (c[i]==o)
						c[i].style.border="2px solid #012101";
					else
						c[i].style.border="2px solid transparent";
				}

				//mesh_color=o.style.background;
				mesh_color=o_color;
				update_mesh_color();
			}


			function update_mesh_color()
			{
				if (mesh==null) return;
				mesh.material.color.set(parseInt(mesh_color.substr(1),16));
			}

			function calc_vol_and_area(geo)
			{
				var x1,x2,x3,y1,y2,y3,z1,z2,z3,i;
				var len=geo.faces.length;
				var totalVolume=0;
				var totalArea=0;
				var a,b,c,s;

				for (i=0;i<len;i++)
				{
					x1=geo.vertices[geo.faces[i].a].x;
					y1=geo.vertices[geo.faces[i].a].y;
					z1=geo.vertices[geo.faces[i].a].z;
					x2=geo.vertices[geo.faces[i].b].x;
					y2=geo.vertices[geo.faces[i].b].y;
					z2=geo.vertices[geo.faces[i].b].z;
					x3=geo.vertices[geo.faces[i].c].x;
					y3=geo.vertices[geo.faces[i].c].y;
					z3=geo.vertices[geo.faces[i].c].z;

					totalVolume +=
						(-x3 * y2 * z1 +
						x2 * y3 * z1 +
						x3 * y1 * z2 -
						x1 * y3 * z2 -
						x2 * y1 * z3 +
						x1 * y2 * z3);

					a=geo.vertices[geo.faces[i].a].distanceTo(geo.vertices[geo.faces[i].b]);
					b=geo.vertices[geo.faces[i].b].distanceTo(geo.vertices[geo.faces[i].c]);
					c=geo.vertices[geo.faces[i].c].distanceTo(geo.vertices[geo.faces[i].a]);
					s=(a+b+c)/2;
					totalArea+=Math.sqrt(s*(s-a)*(s-b)*(s-c));
				}

				return [Math.abs(totalVolume/6), totalArea];
			}

			function numberWithCommas(x)
			{
				var parts = x.toString().split(".");
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return parts.join(".");
			}

			function set_shading(i)
			{
				if (i==2)
					material.wireframe=true;
				else
				{
					material.wireframe=false;
					material.shading=((i==1)?THREE.SmoothShading:THREE.FlatShading);
					if (mesh!=null)
						mesh.geometry.normalsNeedUpdate = true;
				}
			}

			function view_example(ename)
			{
				download_from_local('examples/'+ename, ename);
			}

			function reset()
			{
				if (waiting) return;
				switch_view('drag');
				remove_edges();
				if (mesh!=null) {scene.remove(mesh);mesh=null;}
				$id('fileselect').value='';
			}

			function prepare_upload_file()
			{
				if (waiting) return;
				if ($id('fileselect').value=='') return;

				upload_file($id('fileselect').files[0]);
			}

			function open_img()
			{
				var imgform = document.createElement("form");
				imgform.target = "_blank";
				imgform.method = "POST";
				imgform.action = "/snap_img/";

				// Create an input
				var imginput = document.createElement("input");
				imginput.type = "text";
				imginput.name = "img_data";
				imginput.value = renderer.domElement.toDataURL("image/png");

				// Add the input to the form
				imgform.appendChild(imginput);

				// Add the form to dom
				document.body.appendChild(imgform);

				// Just submit
				imgform.submit();
			}

						function setCookie(cname, cvalue, exdays)
			{
				var d = new Date();
				d.setTime(d.getTime() + (exdays*24*60*60*1000));
				var expires = "expires="+d.toUTCString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			}

			function getCookie(cname)
			{
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i=0; i<ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1);
					if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
				}
				return "";
			}

			function guess_file_units(xsize,ysize,zsize)
			{
				//try to guess the file's units (mm or inch?)
				if ((xsize<1)&&(ysize<1)&&(zsize<1))
				{
					file_units=2;
					rin.checked=true;
				}
				else
				{
					file_units=1;
					rmm.checked=true;
				}
			}

			function set_vol_and_size(vol,xsize,ysize,zsize)
			{
				var p=view_units==2?2:0;
				$id('ivol').innerHTML=numberWithCommas(vol.toFixed(p));
				$id('isize').innerHTML=numberWithCommas(xsize.toFixed(p))+' x '+numberWithCommas(ysize.toFixed(p))+' x '+numberWithCommas(zsize.toFixed(p));
			}

			function save_stl()
			{
				if (waiting) return;
				if (!mesh) return;

				var form = document.createElement("form");
				form.setAttribute("method", "post");
				form.setAttribute("action", "/general/save_stl.php");

				var vf = document.createElement("input");
				vf.setAttribute("type", "hidden");
				vf.setAttribute("name", "vf");
				vf.setAttribute("value", JSON.stringify(geo_to_vf(mesh.geometry)));
				form.appendChild(vf);

				var on = document.createElement("input");
				on.setAttribute("type", "hidden");
				on.setAttribute("name", "on");
				on.setAttribute("value", model_filename);
				form.appendChild(on);

				var units = document.createElement("input");
				units.setAttribute("type", "hidden");
				units.setAttribute("name", "units");
				units.setAttribute("value", file_units);
				form.appendChild(units);

				var colored = document.createElement("input");
				colored.setAttribute("type", "hidden");
				colored.setAttribute("name", "colored");
				colored.setAttribute("value", colored_model?1:0);
				form.appendChild(colored);

				form.submit();
			}

					</script>
	</head>

	<body>

		<input type="file" style="position:absolute; top:-150px;" id="fileselect" onchange="prepare_upload_file();">

				<header><h4>Welcome to the free online STL viewer!<br>View 3D STL files directly in your browser - no software installation is required.<br>We upload nothing to our server - everything is done client side.
</h4></header>
					<div style="width:100%;text-align:center;margin-bottom:10px;">
					<!-- a href="/embed/" class="stitle" style="text-decoration:none;">* New - embed Viewstl.com in your own website!</a -->
					<!-- a href="https://wordpress.org/plugins/wp-viewstl/" class="stitle" target="_blank" style="text-decoration:none;">Check Viewstl's WordPress plugin by <b>falldeaf</b>!</a><br -->
				</div>


				<div id="pwait" style="background: rgba(0,0,0,0.5);position: fixed;top: 0;right: 0;bottom: 0;left: 0;display:none;z-index:99999999;text-align:center;">
					<div id="wtext" style="position:relative;margin:250px auto 0 auto;width:500px;height:80px;padding-top:10px;background:#EEEEEE;font:20px Arial;color:#343434;z-index: 99999;pointer-events: auto;border-radius:25px;">
						<span id="pwait_txt">Preparing file for 3D Printing</span><br>
						<span style="text-decoration:underline;cursor:pointer;" onclick="cancel_3dp=true;" id="c3dp">(cancel)</span><br>
						<progress id="pbar_3dp" value="0" max="1"></progress>
					</div>
				</div>


		<div id="mainwrap" style="text-align:center;margin:0 auto;visibility:hidden;">
			<div id="cjcwrap" style="position:relative;border:1px dashed #000000;background:#EEEEEE;display:inline-block;">
				<div id="cjcdrag" style="position:absolute;height:100px;width:350px;text-align:center;">
										<span id="titlet1" style="font:20px Arial;color:#343434;">Drag & drop your STL file here</span><br>
					<span id="titlet2" style="font:14px Arial;color:#3434AB;cursor:pointer;" onclick="if (waiting) return false;$id('fileselect').click();">or <u>browse your computer</u></span>
															<div style="width:100%;text-align:center;margin:30px auto 0 auto;">
						<div style="font:12px Arial;color:#5656AB;text-align:left;width:130px;margin:0 auto;">
							<span style="width:60px;display:inline-block;">Example:</span> <span style="border-bottom: 1px dotted #3434AB;cursor:pointer;width:60px;" onclick="view_example('knot.stl');">Knot</span>
							<br>
							<span style="width:60px;display:inline-block;margin-top:7px;">Example:</span> <span style="border-bottom: 1px dotted #3434AB;cursor:pointer;width:60px;" onclick="view_example('android.obj');">Android</span>
						</div>
					</div>
									</div>

				<div id="cjcpbar" style="display:none;position:absolute;height:50px;width:350px;text-align:center;">
					<span id="pgt1" style="font:15px Arial;color:#343478;">Reading file ...</span><br>
					<progress id="file_pbar"  value="0" max="1"></progress><br><span id="fcancel" style="text-decoration:underline;cursor:pointer;" onclick="cancel_download=true;">(cancel)</span>
				</div>

				<div id="cjcproc" style="display:none;position:absolute;height:50px;width:350px;text-align:center;">
					<span id="prt1" style="font:15px Arial;color:#343478;">Processing ...</span><br>
				</div>

				<div id="cjc" onmousedown="$id('rrotate2').checked=true;controls.autoRotate=false;" style="display:none;position:absolute;left:0px;top:0px;margin:0 auto;text-align:center;"></div>
							</div>

						<div id="statswrap" style="width:0px;height:0px;">
				<div style="width:280px;overflow:hidden;">
					<h1 id="ifilename" style="visibility:hidden;">_</h1>

					<div class="cinfo">
						<h2>Model info</h2>
						<table>
							<tr style="vertical-align:bottom;">
								<th>Size (<select id="suview" onchange="set_view_units(this.value);"><option value="1">mm</option><option value="2">in</option></select>)</th>
								<td id="isize" style="width:50%;"></td>
							</tr>
							<tr>
								<th>Volume (<span id="vunits">mm</span><sup>3</sup>)</th>
								<td id="ivol" style="text-align:left;"></td>
							</tr>
							<tr>
								<th>File units</th>
								<td>
									<input type="radio" id="rmm" onclick="set_file_units(1);" name="runits" value="0" checked>mm<br>
									<input type="radio" id="rin" onclick="set_file_units(2);" name="runits" value="1">in<br>
								</td>
							</tr>
						</table>
					</div>


					<div class="cinfo">
						<h2>Options</h2>
						<table>
							<tr>
								<th>Display</th>
								<td>
									<input type="radio" id="rshade1" onclick="set_shading(0);" name="rshade" value="0" checked>Flat Shading<br>
									<input type="radio" id="rshade2" onclick="set_shading(1);" name="rshade" value="1">Smooth Shading<br>
									<input type="radio" id="rshade3" onclick="set_shading(2);" name="rshade" value="2">Wireframe<br>
								</td>
							</tr>
							<tr>
								<th>Color</th>
								<td id="cpal">
																	<div class="cbar" id="black_color" onclick="set_color(this,'#000000');" style="background:#000000;"></div>
									<div class="cbar" id="white_color" onclick="set_color(this,'#FFFFFF');" style="background:#FFFFFF;"></div>
									<div class="cbar" id="blue_color" onclick="set_color(this,'#0000FF');" style="background:#0000FF;"></div>
									<div class="cbar" id="green_color" onclick="set_color(this,'#00FF00');" style="background:#00FF00;"></div>
									<div class="cbar" id="red_color" onclick="set_color(this,'#FF0000');" style="background:#FF0000;"></div>
									<div class="cbar" id="yellow_color" onclick="set_color(this,'#FFFF00');" style="background:#FFFF00;"></div>
									<div class="cbar" id="gray_color" onclick="set_color(this,'#909090');" style="background:#909090;border:2px solid #012101;"></div>
									<div class="cbar" id="azure_color" onclick="set_color(this,'#00FFFF');" style="background:#00FFFF;"></div>
									<div class="cbar" id="pink_color" onclick="set_color(this,'#FF00FF');" style="background:#FF00FF;"></div>
									<div class="cbar" id="purple_color" onclick="set_color(this,'#703487');" style="background:#703487;"></div>
									<div class="cbar" id="darkblue_color" onclick="set_color(this,'#102075');" style="background:#102075;"></div>
									<div class="cbar" id="brown_color" onclick="set_color(this,'#654321');" style="background:#654321;"></div>

												</td>
							</tr>

							<tr>
								<th>Orientation</th>
								<td>
									<select id="sel_orientation" onchange="set_orientation(this.value);">
										<option value="front">Front</option>
										<option value="right">Right</option>
										<option value="top">Top</option>
										<option value="back">Back</option>
										<option value="left">Left</option>
										<option value="bottom">Bottom</option>
									</select>
								</td>
							</tr>

							<tr>
								<th>Edges</th>
								<td>
									<input type="radio" id="redge1" onclick="set_edges(true);" name="redge" value="0">Yes<br>
									<input type="radio" id="redge2" onclick="set_edges(false);" name="redge" value="1" checked>No<br>
								</td>
							</tr>

							<tr>
								<th>Auto- rotation</th>
								<td>
									<input type="radio" id="rrotate1" onclick="controls.autoRotate=true;" name="rrotate" value="0" checked>Yes<br>
									<input type="radio" id="rrotate2" onclick="controls.autoRotate=false;" name="rrotate" value="1">No<br>
								</td>
							</tr>
						</table>
					</div>

					<div class="cinfo">
						<h2>Actions</h2>
						<div class="cact" onclick="open_img();"><span>Snap a picture</span></div>
						<div>Check if print-ready (coming soon)</div>
						<div style="margin-top:10px;margin-bottom:10px;" onclick="send_to_ts();"><span class="btn-ts">3D Print with Treatstock</span></div>
						<div style="margin-top:20px;margin-bottom:10px;" onclick="save_stl();"><span class="btn-stc">Save to computer</span></div>
					</div>


					<div style="width:100%;text-align:center;cursor:pointer;text-decoration:underline;color:#000055;" onclick="reset();">View another STL</div>

				</div>
			</div>

				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<!-- Standard -->
		<ins class="adsbygoogle"
			style="display:block"
			data-ad-client="ca-pub-2715856240118156"
			data-ad-slot="5879739624"
			data-ad-format="auto"></ins>
		<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
		</script>


						<div style="width:100%;text-align:center;margin-top:20px;"><h5>Powered by <a href="http://www.threejs.org/" target="_blank">three.js</a></h5></div>
					</div>



		<script>
			var scene = new THREE.Scene();
			var is_webgl=webgl_Detector.webgl;
			var renderer = is_webgl ? new THREE.WebGLRenderer({preserveDrawingBuffer:true, alpha:true}): new THREE.CanvasRenderer();
			var mesh=null;
			var ambientLight     = null;
			var directionalLight = null;
			var pointLight       = null;
			var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);

			do_resize();

			renderer.setClearColor( bg_color, 1);
			$id('cjc').appendChild(renderer.domElement);
			camera.position.set(0,0,100);
			scene.add(camera);

			ambientLight = new THREE.AmbientLight(0x202020);
			camera.add(ambientLight);

			directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
			directionalLight.position.x = 1;
			directionalLight.position.y = 1;
			directionalLight.position.z = 2;
			directionalLight.position.normalize();
			camera.add(directionalLight);

			pointLight = new THREE.PointLight(0xffffff, 0.3);
			pointLight.position.x = 0;
			pointLight.position.y = -25;
			pointLight.position.z = 10;
			camera.add(pointLight);

			function animate()
			{
 			    requestAnimationFrame(animate);
 				renderer.render(scene, camera);
				controls.update();
			}


			var units_cookie=getCookie("units");
			suview.value=units_cookie=="in"?2:1;
			view_units=units_cookie=="in"?2:1;
			$id("vunits").innerHTML=units_cookie=="in"?"in":"mm";


			//this function is being called from outside (from embedded page)
			function set_rotation(b)
			{
				controls.autoRotate=b;
				animate();
			}

			//this function is being called from outside (from embedded page)
			function set_clean_mode(b)
			{
				$id('titlet1').style.display=b?'none':'inline';
				$id('titlet2').style.display=b?'none':'inline';
				$id('pgt1').style.display=b?'none':'inline';
				$id('file_pbar').style.display=b?'none':'inline';
				$id('fcancel').style.display=b?'none':'inline';
				$id('prt1').style.display=b?'none':'inline';
			}

			//this function is being called from outside (from embedded page)
			function set_noborder(b)
			{
				$id('cjcwrap').style.border=(b?'none':'1px dashed #000000');
			}

			var controls = new THREE.OrbitControls(camera, renderer.domElement);

			if (is_webgl)
				controls.autoRotate=true;
			else
			{
				 $id('rrotate2').checked=true; 				controls.autoRotate=false;
			}

			animate();
