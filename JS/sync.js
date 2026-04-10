// JS/sync.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

// 1. 본인의 Firebase 설정값으로 교체하세요!
const firebaseConfig = {
    apiKey: "AIzaSyAlmsbNZCz0GocTdVIWeVeWV0nPwH3BV2w",
    authDomain: "brat-web.firebaseapp.com",
    projectId: "brat-web",
    storageBucket: "brat-web.firebasestorage.app",
    messagingSenderId: "90873499307",
    appId: "1:90873499307:web:7a67119c6a868da230f1ee",
    measurementId: "G-J2H0CLS5BF"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 데이터베이스의 경로 설정
const postsRef = ref(db, 'bratPosts');
const usersRef = ref(db, 'bratUsers');

// [기능 1] 내 로컬 데이터를 클라우드로 업로드 (공유용)
window.uploadToCloud = () => {
    const posts = JSON.parse(localStorage.getItem('bratPosts')) || [];
    const users = JSON.parse(localStorage.getItem('bratUsers')) || {};

    // Firebase에 데이터 덮어쓰기
    set(postsRef, posts);
    set(usersRef, users);
    console.log("데이터가 클라우드로 전송되었습니다!");
};

// [기능 2] 남이 수정한 데이터를 내 화면에 실시간 반영
onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        localStorage.setItem('bratPosts', JSON.stringify(data));
        // 게시판 페이지(board.html)에 있다면 표를 다시 그림
        if (typeof renderTable === 'function') {
            renderTable(data);
        }
    }
});

onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        localStorage.setItem('bratUsers', JSON.stringify(data));
        // 유저 관리 페이지(admin_users.html)에 있다면 다시 그림
        if (typeof renderUsers === 'function') {
            renderUsers();
        }
    }
});