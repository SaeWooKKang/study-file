let shortId;

$(document).ready(() => {
  shortId = localStorage.getItem("shortId");

  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/posts/${ shortId }/find`,
    success: (res) => {
      console.log(res);
      $('#title').val(res.title);
      $('#content').val(res.content);
    }
  });
});

const updatePost = () => {
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

  let formData = $('#updateForm').serialize();
  
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/posts/${ shortId }/update`,
    data: formData,
    success: res => {
      alert(res.result);
      
      // 리다이렉트
      location.href = '/view/posts/list.html';

      return;
    }
  });
}