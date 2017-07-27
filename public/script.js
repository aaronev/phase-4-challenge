var DOM = {
  cancelAddReview: document.querySelector(".close-review-button"),
  openAddReview: document.querySelector(".open-review-button"),
  addReviewForm: document.querySelector(".add-review"),
}

window.onload = function() {
  DOM.cancelAddReview.style.display = "none"
  DOM.addReviewForm.style.display = "none"
}

function showAddForm() {
  DOM.cancelAddReview.style.display = "block"
  DOM.openAddReview.style.display = "none"
  DOM.addReviewForm.style.display = "block"
}

function hideAddForm() {
  DOM.cancelAddReview.style.display = "none"
  DOM.openAddReview.style.display = "block"
  DOM.addReviewForm.style.display = "none"
}

function confirmDelete(reviewID) {
  if (confirm("Are you sure you want to delete?")) {
    fetch("/authorized/delete/"+reviewID, {
      method: 'DELETE', 
      credentials: 'include'
    }).then(location.reload())
  }
}