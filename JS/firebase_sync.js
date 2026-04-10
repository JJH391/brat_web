// JS/firebase_sync.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// [주의] 본인의 Firebase 설정값으로 반드시 교체하세요!
const firebaseConfig = {
    apiKey: "AIzaSyBuUci9WKbBS0lZf_OiUxOC_mmhXGq7_A0",
    authDomain: "self-introduction-9531e.firebaseapp.com",
    projectId: "self-introduction-9531e",
    storageBucket: "self-introduction-9531e.firebasestorage.app",
    messagingSenderId: "598658034879",
    appId: "1:598658034879:web:e9d9f1aa8772a0650e2a0a",
    measurementId: "G-WHB048ZT3Q"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 데이터를 클라우드에 업로드하는 함수 (전역 등록)
window.uploadToCloud = function() {
    const posts = localStorage.getItem('bratPosts');
    const users = localStorage.getItem('bratUsers');
    if (posts) set(ref(db, 'bratPosts'), JSON.parse(posts));
    if (users) set(ref(db, 'bratUsers'), JSON.parse(users));
};

// 실시간 데이터 수신: 서버에 변화가 생기면 내 LocalStorage를 즉시 업데이트
onValue(ref(db, 'bratPosts'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        localStorage.setItem('bratPosts', JSON.stringify(data));
        // 게시판 페이지라면 테이블을 다시 그려줌
        if (typeof renderTable === 'function') renderTable(data);
    }
});

onValue(ref(db, 'bratUsers'), (snapshot) => {
    const data = snapshot.val();
    if (data) localStorage.setItem('bratUsers', JSON.stringify(data));
});