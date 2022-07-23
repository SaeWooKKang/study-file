const login = () => {
  // 유효성 검사
  if (!$('#email').val()) {

    alert ('이메일을 입력해주세요.');
    $('#email').focus();

    return ;
  } else if (!$('#password').val()) {

    alert ('비밀번호를 입력해주세요.');
    $('#email').focus();

    return ;
  }
  
  let loginForm = $('#loginForm').serialize();

  // 비동기 요청
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/user/login',
    data: loginForm,
    success: res => {

      // 비밀번호 변경 로직
      if (res.requireSetPassword) {
        sessionStorage.setItem('email', res.email);

        location.href = '/view/user/setPassword.html';
        return;
      } 
      // 브라우저 cookie에 token 저장
      $.cookie(
        "accessToken",
        res.accessToken,
        { expires: 1, path: '/' }
      );

      // 브라우저 sessionStorage 저장
      sessionStorage.setItem('email', res.email);
      sessionStorage.setItem('name', res.name);
      
      alert('로그인 되었습니다.');
      
      // redirect
      location.href = '/view/posts/list.html';
    },
    error: res => {
      alert(res.responseJSON.fail);
    }
  });

}
