/*---------------------------------------
Example #1
---------------------------------------*/

lazyloud();

window.onscroll = function (event) {
	lazyloud();
}

function lazyloud(){
	let lazyImage = document.querySelectorAll('.lazy');
	for (let i=0; i<lazyImage.length; i++){
		if (elementInViewport(lazyImage[i])){
			lazyImage[i].setAttribute('src',lazyImage[i].getAttribute('data-src'));
			lazyImage[i].setAttribute('alt','image');
		}
	}
}

function elementInViewport (el) {
	let rect = el.getBoundingClientRect();
	console.log(rect);
	return (
		rect.top>=0 &&
		rect.left>=0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/*---------------------------------------
Example #2 Lozad.js
---------------------------------------*/


// const observer = lozad();
// observer.observe();



/*---------------------------------------
Example #3 Lazy Loading Using the Intersection Observer API
---------------------------------------*/

// // Get all of the images that are marked up to lazy load
// let images = document.querySelectorAll('.js-lazy-image');


// const config = {
//   rootMargin: '0px 0px',
//   threshold: 0.01
// };

// // The observer for the images on the page
// let observer = new IntersectionObserver(onIntersection, config);
//   images.forEach(image => {
//     observer.observe(image);
//   });


// function onIntersection(entries) {
//   // Loop through the entries
//   entries.forEach(entry => {
//     // Are we in viewport?
//     if (entry.intersectionRatio > 0) {
// 	console.log(entry.target);
//       // Stop watching and load the image
//       observer.unobserve(entry.target);
//       preloadImage(entry.target);
//     }
//   });
// }

// function preloadImage (el) {
// 	el.setAttribute('src',el.getAttribute('data-src'));
// 	el.setAttribute('alt','image');
// }

