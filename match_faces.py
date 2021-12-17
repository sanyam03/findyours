import face_recognition
import glob
# get all the missing cases submitted by user  ie in known files
directory = "./uploads/known"
missing_cases = glob.glob("./uploads/known/*")

# get all the new cases submitted by user  ie in unknown files
new_cases = glob.glob("./uploads/unknown/*")

known_cases = []
unknown_cases = []
for case in missing_cases: 
    load_image = face_recognition.load_image_file(case)
    load_encoding = face_recognition.face_encodings(load_image)[0]
    known_cases.append(load_encoding)

for case in new_cases:
    load_image = face_recognition.load_image_file(case)
    unknown_cases.append(face_recognition.face_encodings(load_image)[0])

results = face_recognition.compare_faces(known_cases, unknown_cases[1])
print(results)