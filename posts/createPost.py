from zipfile import ZipFile
import os
from os.path import basename
import cv2
import re
import json
import easygui
import shutil


# ------------------------------------------------------
# |  I know this is not really optimized and shit      |
# |  this was meant to be a quick script               |
# |  and it got more and more complex                  |
# |                                                    |
# |  it works i guess                                  |
# |                                                    |
# ------------------------------------------------------


path = easygui.diropenbox()

print("\n\n\nsource path:   " + path + "\n\n\n\n")


with open("./posts.json", "r+") as f:
    try:
        data = json.load(f)
        data["numberOfPosts"] = data["numberOfPosts"] + 1
        currentPostID = data["numberOfPosts"]
        currentPostName = "post" + str(currentPostID)
        initialNumberOfImages = data["numberOfImages"]
        currentImageID = data["numberOfImages"]
        currentSrcID = currentImageID
        allPostsData = data["posts"]
    except:
        print("error reading file! starting from 1 \n")
        currentPostID = 1
        currentPostName = "post" + str(currentPostID)
        initialNumberOfImages = 0
        currentImageID = 0
        currentSrcID = currentImageID
        allPostsData = {}
        pass


# compiledPath = re.compile(path, re.IGNORECASE)
imagesDate = re.search("\d\d[-]\d\d[-]\d\d\d\d", path)

print("-------------------------------------------------------")
print("date read:          " + str(imagesDate[0]))
print("images exist:       " + str(currentImageID))
print("making post:        " + str(currentPostName))
print("-------------------------------------------------------\n")
dictionarySrc = {}
dictionaryImages = {}


postsDirectory = ".\\" + currentPostName
checkDirectory = [postsDirectory + "\\edit", postsDirectory + "\\edit\\fullsize",
                  postsDirectory + "\\edit\\medium", postsDirectory + "\\edit\\thumbnail", postsDirectory + "\\src", postsDirectory + "\\download"]

for i in checkDirectory:
    if not os.path.isdir(i):
        os.makedirs(i)
        print("created dir:     " + i)
open(".\\posts.json", "w")  # create the file if it don't exist
print("\n")


def makeZipFile(zipObj, which):
    for folderName, subfolders, filenames in os.walk(postsDirectory + "\\" + which + "\\"):
        for filename in filenames:
            #create complete filepath of file in directory
            filePath = os.path.join(folderName, filename)
            # Add file to zip
            zipObj.write(filePath, basename(filePath))

def writeFilesToZips():
    with ZipFile(currentPostName + "\\download\\src.zip", 'w') as zipObj:
        makeZipFile(zipObj, "src")
    with ZipFile(currentPostName + "\\download\\edit.zip", 'w') as zipObj:
        makeZipFile(zipObj, "edit")




comment = {}

def createThumbnail(filename):
    im = cv2.imread(path + "\\picks\\edit\\" + filename, cv2.IMREAD_UNCHANGED)
    h = im.shape[0]
    w = im.shape[1]
    dim = (int(480 * w / h), 480)
    resized = cv2.resize(im, dim, interpolation=cv2.INTER_AREA)
    cv2.imwrite(postsDirectory + "\\edit\\thumbnail\\" +
                filename.rsplit(".", 1)[0] + ".jpg", resized, [cv2.IMWRITE_JPEG_QUALITY, 80])
    print("thumbnail        " + filename)


def createMedium(filename):
    im = cv2.imread(path + "\\picks\\edit\\" + filename, cv2.IMREAD_UNCHANGED)
    h = im.shape[0]
    w = im.shape[1]
    dim = (int(1920 * w / h), 1920)
    resized = cv2.resize(im, dim, interpolation=cv2.INTER_AREA)
    cv2.imwrite(postsDirectory + "\\edit\\medium\\" +
                filename.rsplit(".", 1)[0] + ".jpg", resized, [cv2.IMWRITE_JPEG_QUALITY, 90])
    print("medium           " + filename)


def copyFullsize(filename):
    shutil.copy2(path + "\\picks\\edit\\" + filename,
                 postsDirectory + "\\edit\\fullsize\\")
    print("fullsize         " + filename)


def copySrc(filename):
    shutil.copy2(path + "\\picks\\" + filename, postsDirectory + "\\src\\")
    print("srcimage          " + filename)


for filename in os.listdir(path + "\\picks\\edit"):
    if filename.endswith(".jpg" or ".jpeg" or ".png" or "JPG" or "JPEG" or "PNG"):
        currentImageID += 1
        dictionaryImages["img" + str(currentImageID)] = filename
        createThumbnail(filename)
        createMedium(filename)
        copyFullsize(filename)
        print()
print()

for filename in os.listdir(path + ".\\picks\\"):
    if filename.endswith(".CR2"):
        currentSrcID += 1
        dictionarySrc["img" + str(currentSrcID)] = filename
        copySrc(filename)
print()

writeThis = {
    currentPostName: {
        "edit": {
            "rangeStart": initialNumberOfImages + 1,
            "rangeEnd": initialNumberOfImages + currentImageID - initialNumberOfImages,
            "name": dictionaryImages
        },
        "info":
        {
            "contentType": "photos",
            "date": str(imagesDate[0]),
            "imgComments": {}
        },
        "src": dictionarySrc
    }
}

defaultJson = {
    "numberOfPosts": 0,
    "numberOfImages": 0,
    "posts": {}
}



writeFilesToZips()

def writeJsonData():
    with open(".\\posts.json", "r+") as f:
        data = json.load(f)
        data["posts"] = writeThis | allPostsData
        data["numberOfPosts"] = currentPostID
        data["numberOfImages"] = currentImageID
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=2)

        # addComments(data)
        f.truncate()
        print("\n-------------------------------------------------------")
        print("written " + currentPostName + " to posts.json")
        print("-------------------------------------------------------\n")


try:
    writeJsonData()
except:
    open(".\\posts.json", "w").write("{\n}")
    with open(".\\posts.json", "r+") as f:
        data = json.load(f)
        data = defaultJson
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=2)
        f.truncate()
        print("default json loaded")
    writeJsonData()


def writeComment(commentText, commentImageID):
    with open(".\\posts.json", "r+") as f:
        data = json.load(f)
        rangeStart = data["posts"][currentPostName]["edit"]["rangeStart"]
        rangeEnd = data["posts"][currentPostName]["edit"]["rangeEnd"]
        commentImageID += rangeStart
        data["posts"][currentPostName]["info"]["imgComments"]["img" +
                                                              str(commentImageID)] = str(commentText)
        print(commentText)
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=2)
        f.truncate()
        print("comment for img" + str(commentImageID) + " written:    " + commentText)


def addComments():
    commentImageID = 0
    for filename in os.listdir(".\\" + currentPostName + "\\edit\\thumbnail"):
        commentText = easygui.enterbox(
            "add comment", image=".\\" + currentPostName + "\\edit\\thumbnail\\" + filename)
        writeComment(commentText, commentImageID)
        commentImageID += 1


if (easygui.ynbox("do you wanna add comments?")):
    addComments()