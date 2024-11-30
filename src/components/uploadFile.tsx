import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// 파일 업로드 함수
export const uploadFile = async (path: string, file: File) => {
  try {
    // 스토리지 경로 설정
    const storageRef = ref(storage, `${path}/${file.name}_${Date.now()}`);

    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);
    alert("사진이 업로드 되었습니다.");

    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("이미지 업로드 실패 : ", error);
  }
};

// Firestore에 사용자의 프로필 사진 정보 가져오기
export const fetchProfileImage = async (userId: string) => {
  try {
    const user = doc(firestore, "users", userId);
    const snapshot = await getDoc(user);
    if (snapshot.exists()) {
      return snapshot.data().profileImage;
    }
    return null;
  } catch (error) {
    console.error("이미지 불러오기 실패 :", error);
  }
};
