console.log('hello from the browser JavaScript')

$(document).on('click', '.trash', function(event) {
  $(this).parent().remove()
})

function showAddForm() {
  document.querySelector(".add-review").style.display = 'block'
}

function hideAddForm() {
  document.querySelector(".add-review").style.display = 'none'
}