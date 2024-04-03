
const image = document.querySelector('img'); 
const menuItem = document.getElementById('first-menu-item-id');


function displayImageName(name) {
  menuItem.textContent = name; 
}


function clearImageName() {
  menuItem.textContent = ''; 
}


image.addEventListener('mouseover', () => {
 
  const imageName = 'Image Name';
  displayImageName(imageName);
});

image.addEventListener('mouseout', clearImageName);
