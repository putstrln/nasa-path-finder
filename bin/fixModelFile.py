import datetime
import httplib
import sys
import time
import os

# Usage: put in a folder with stl files to add endfacet statement

def fixFile(filename):
    print("Fixing file: " + filename)
    f = open(filename, 'r')
    filedata = f.read()
    f.close()

    newdata = filedata.replace("endloop", "endloop\n endfacet\n")

    #print(newdata)
    f = open(filename, 'w')
    f.write(newdata)
    f.close()




def openFiles():
    global i
    for file in os.listdir(sys.argv[1]):
        if file.endswith(".stl"):
            thefile = os.path.join(sys.argv[1], file)
	    i=i+1
            fixFile(thefile)




def main():
    global i
    i = 0
    if len(sys.argv) < 2:
 			print('Usage: specify a folder with stl files to add endfacet statement');
			exit() 
    print ("getting list of files from " + sys.argv[1])
    openFiles()
    print(i)
    print(" Files fixed")




if __name__ == '__main__':
    print("fixModelFiles started - " + str(datetime.datetime.utcnow()))
    main()
    print("fixModelFiles finished - " + str(datetime.datetime.utcnow()))

    sys.exit(0)

