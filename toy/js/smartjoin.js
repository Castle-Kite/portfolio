var cnt = 1;
$(document).ready(function(){
	// 프로필 사진 '파일 선택' 
    $('#filefr').on('change', '.file', function(evt){
        var sfile = $(this).val();
        if(!sfile){
           var sid = $(this).attr('id');
           sid = sid.substring(4);
           $('#file' + sid).remove();
           $('#image' + sid).parent().parent().remove();
           return;
        }
        var no = cnt;
        var path = URL.createObjectURL(evt.target.files[0]);
        $('#preView').stop().slideUp(500, function(){
           addTag(path, no);
           $('#preView').slideDown(500);
        });
        $('#filefr').append('<input type="file" name="file" id="file' + ++cnt + 
                          '" class="w3-col m7 w3-border w3-padding w3-input file" placeholder="이미지 파일 선택!">');
     });
     
     function addTag(path, no){
        var tag =   '<div class="inblock box100 w3-border mgl10 mgb10 w3-card-4">' +
                    '<div class="w3-col w3-border imgbox mgl10 mgb10 mgt10">' +
                       '<img class="img1" id="image' + no + '" src="' + path + '">' +
                    '</div>' +
                 '</div>';
        $('#imgfr').append(tag);
     }
     
     // 성별 이미지 슬라이드
 	$('input[name="gen"]').change(function(){
            
            var sgen = $('.gen:checked').val();
            
            
            var htag = '';
            var stag = '';
            if(sgen == 'M'){
               stag = '#man';
               htag = '#woman';
            } else {
               htag = '#man';
               stag = '#woman';
               
            }
            $(htag).slideUp(600, function(){
            //   alert(sgen);
               $(stag).slideDown(600);
               $('#avt').css('display', 'block');
            });
 	 });
            
 	
 	// 유효성 검사와 정규식 표현
 	$('#jbtn').click(function(){
	 		var getName = RegExp(/^[가-힣]{2,10}$/); // 이름 표현식
	 		var getID = RegExp(/^[a-z][a-z0-9]{4,9}$/); // 아이디 표현식
	 		var getPass = RegExp( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#%*_!?])([a-zA-Z0-9#%*_!?]{5,8})$/); // 비밀번호 표현식
	 		var getMail = RegExp(/^[a-z0-9]{4,10}@[a-z]{2,10}[.][a-z]{2,3}(\.[a-z]{0,2})?$/); // 이메일 표현식
	 		var getNumber = RegExp(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/); // 전화번호 표현식
	 		
	 		// 이름 유효성 검사
	 		if(!getName.test($('#name').val())){
	 			alert('형식에 맞게 입력해주세요');
	 			$('#name').val('');
	 			$('$name').focus();
	 			return;
	 		}
	 		
	 		// 아이디 유효성 검사
	 		if(!getID.test($('#id').val())){
	 			alert('사용할 수 없는 아이디입니다');
	 			$('#id').val('');
	 			$('#id').focus();
	 			return;
	 		}
	 		
	 		// 비밀번호 유효성 검사
	 		if(!getPass.test($('#pw').val())){
	 			alert('사용할 수 없는 비밀번호 형식입니다');
	 			$('#pw').val('');
	 			$('#pw').focus();
	 			return;
	 		}
	 		
	 		// 이메일 유효성 검사
	 		if(!getMail.test($('#mail').val())){
	 			alert('이메일 형식이 맞지 않습니다');
	 			$('#mail').val('');
	 			$('#mail').focus();
	 			return;
	 		}
	 		
	 		// 전화번호 유효성 검사
	 		if(!getNumber.test($('#hp').val())){
	 			alert('전화번호 형식이 맞지 않습니다');
	 			$('#hp').val('');
	 			$('#hp').focus();
	 			return;
	 		}
 		$('#frm').submit();
 	});
 	
 			// 비밀번호 확인
	 		$('#rpw').keyup(function(){
				var skey = $('#pw').val();
				var tkey = $(this).val();
				$('#pwmsg').stop().fadeOut(500, function(){
					if(skey == tkey){ 
						$('#rpw').blur();
						$('#pwmsg').html('* 정확한 비밀번호 입니다. *');
						$('#pwmsg').removeClass('w3-text-red').addClass('w3-text-blue');
					} else {
						$('#pwmsg').html('# 비밀번호가 다릅니다. #');
						$('#pwmsg').removeClass('w3-text-blue').addClass('w3-text-red');
						
					}
					$('#pwmsg').fadeToggle(500);
				});
			});
			
	 	
	 		// 비동기 통신
	 		$('#idck').click(function(){
	 			var sid = $('#id').val();
	 			if (!sid){
	 				$('#id').focus();
	 				return;
	 			}
	 			$.ajax({
	 				url: '/chopa/member/idCheck.chp',
	 				type: 'post',
	 				dataType: 'json', 
	 				data: {
	 					id: sid
	 				},
	 				success: function(data){ 
	 					if(data.result == 'OK'){
	 						$('#idMsg').css('color', 'green').css('text-align', 'center').html('* 사용가능한 아이디입니다.*');
	 					} else {
	 						$('#idMsg').css('color', 'red').css('text-align', 'center').html('# 사용불가능한 아이디입니다.#');
	 					}
	 					$('#idMsg').css('display');
	 					
	 				},
	 				error: function(){
	 					alert('### 통신 오류 ###')
	 				}
	 			});
	 		});
});		