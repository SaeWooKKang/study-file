const insertPost = () => {
  // 유효성 검사
  if (!$('#title').val()) {

    alert('제목을 입력해주세요.');
    $('#title').focus();

    return;
  } else if (!$('#content').val()) {

    alert('내용을 입력해주세요.');
    $('#content').focus();

    return;
  }

  // form 태그 내의 input들을 자동으로 읽어와 queryString형으로 변경해줌
  // ?name=name&age=1 => queryString
  let formData = $('#insertForm').serialize();
  formData += '&email=' + sessionStorage.getItem('email');
  
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/posts',
    data: formData,
    headers: {
      accessToken: $.cookie('accessToken')
    },
    success: res => {
      alert(res.result);
      location.href = '/view/posts/list.html';

      return;
    }
  });

}