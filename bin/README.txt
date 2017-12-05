Run the script file from inside the directory containing .stl files to fix.

** NOTE
you must run it on a new set of files each time.
it does not create a backup of the original file.


>>python /pathtoscript/fixModelFile.py


SAMPLE RUN
------------------

[thill@RAVEN S0HANDHOLDS]$ python fixModelFile.py
fixModelFiles started - 2017-10-07 19:45:36.795659
getting list of files
Fixing file: ./S0_3515.stl
Fixing file: ./S0_3549.stl
Fixing file: ./S0_3429.stl
Fixing file: ./S0_3509.stl
Fixing file: ./S0_3410.stl
Fixing file: ./S0_KS_H3.stl
Fixing file: ./S0_3404.stl
Fixing file: ./S0_3431.stl
Fixing file: ./S0_3424.stl
Fixing file: ./S0_3443.stl
Fixing file: ./S0_3506.stl
Fixing file: ./S0_3486.stl
Fixing file: ./S0_TRAY_H4.stl
.
.
.
Fixing file: ./S0_3501.stl
Fixing file: ./S0_3412.stl
Fixing file: ./S0_3532.stl
Fixing file: ./S0_3463.stl
Fixing file: ./S0_3459.stl
Fixing file: ./S0_3540.stl
Fixing file: ./S0_3499.stl
Fixing file: ./S0_3511.stl
Fixing file: ./S0_3529.stl
165
 Files fixed

 

example fixed block with end facet statement.

  facet normal -0.999848 0.000000 -0.017455
  outer loop
   vertex 66.888435 -32.547215 401.645325
   vertex 66.696625 144.681152 412.634155
   vertex 66.726257 144.770126 410.936737
  endloop
 end facet
