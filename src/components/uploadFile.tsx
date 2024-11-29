import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

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
    console.error("Error uploading file:", error);
  }
};