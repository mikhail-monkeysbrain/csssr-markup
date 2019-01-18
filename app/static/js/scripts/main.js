function _range() {
  $('.input__range').slider({
    value: 195,
    min: 0,
    max: 400,
    step: 1
  })
}

function _multilineInput() {
  $('.multiinput--container').on('keydown', '.multiinput', function (e) {
    var $enterButton = 13
    var $backspaceButton = 8
    var $upButton = 38
    var $downButton = 40
    var $this = $(e.currentTarget)
    var $inputHidden = $('.inputHidden')
    $('.inputHidden').text($(this).val())
    if (($inputHidden.width() * 1.05) >= $this.width()) {
      $('.inputHidden').html('')
      $this.clone().val('').appendTo('.multiinput--container')
      $this.next().focus()
    }
    if (e.which === $enterButton) {
      $this.clone().val('').appendTo('.multiinput--container')
      $this.next().focus()
    }
    if (e.which === $backspaceButton && $this.val() === '' && $('.multiinput').length > 1) {
      $this.prev().focus()
      $this.remove()
    }
    if (e.which === $upButton) {
      $this.prev().focus()
    }
    if (e.which === $downButton) {
      $this.next().focus()
    }
  })
}

$(document).ready(
  _range(),
  _multilineInput()
)
