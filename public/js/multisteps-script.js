//DOM elements
const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next' };


//remove class from a set of items
const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

//get active button step number
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

  //remove active state from all the state
  removeClasses(DOMstrings.stepsBtns, 'js-active');

  //set picked items to active
  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

//get active panel
const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {

    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel;

};

//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  //show active panel
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {

      elem.classList.add('js-active');

      setFormHeight(elem);

    }
  });

};

//set form height equal to current panel height
const formHeight = activePanel => {

  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

var last_page = 0;
let page_accept = [1];

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }
    if (last_page <= parseInt($(eventTarget).val())) { // next
        let current = $(eventTarget).parents().eq(3).find('div.multisteps-form__content')
            .eq(last_page == 0 ? 0 : last_page - 1);
        let required = current.find('input[name=question-required]').val();
        if(required == 1){
            if (current.find('input[name*=question][type=radio]:checked').length == 0 &&
                current.find('input[name*=question][type=radio]').length != 0 ||
                current.find('input[name*=question][type=checkbox]').length != 0 &&
                current.find('input[name*=question][type=checkbox]:checked').length == 0 ||
                current.find('input[name*=rate][type=text]').length != 0 &&
                current.find('input[name*=rate][type=text]').val() == '' ||
                current.find('input[name*=date-from][type=text]').length != 0 &&
                current.find('input[name*=date-from][type=text]').val() == '' ||
                current.find('input[name*=date-to][type=text]').length != 0 &&
                current.find('input[name*=date-to][type=text]').val() == '' ||
                current.find('input[name*=time-from][type=text]').length != 0 &&
                current.find('input[name*=time-from][type=text]').val() == '' ||
                current.find('input[name*=time-to][type=text]').length != 0 &&
                current.find('input[name*=time-to][type=text]').val() == '' ||
                current.find('input[name*=number][type=number]').length != 0 &&
                current.find('input[name*=number][type=number]').val() == '' ||
                current.find('input[name*=text][type=text]').length != 0 &&
                current.find('input[name*=text][type=text]').val() == '' ||
                current.find('input[name*=number][type=number]').length != 0 &&
                current.find('input[name*=number][type=number]').val() == '' ||
                current.find('select[name*=select]').length != 0 &&
                current.find('select[name*=select]').val() == '' ||
                current.find('input[name*="sub-answer[]"][type=radio]:checked').length == 0 &&
                current.find('input[name*="sub-answer[]"][type=radio]').length != 0) {
                show_pnotify('Vui lòng chọn đáp án');
                return;
            }
        }

        var data = JSON.parse($('#hala').val());
        var len = data.length;
        var prev = data[len - 1];
        var start = prev[1];

        setTimeout(function () {
            var tmp = [];
            $('.js-active').find('.item__title span.index').each(function (index) {

                var currentQ = parseInt(start) + index + 1;
                // var text = $(this).text();
                $(this).text(currentQ);
                tmp = [start + 1, currentQ];
            });

            if (tmp.length) {
                data.push(tmp);
                $('#hala').val(JSON.stringify(data));
            }
        }, 200);
        page_accept.push(parseInt($(eventTarget).val()));
        $('#accept').val(page_accept);
    } else {//prev
        var data = JSON.parse($('#hala').val());
        var len = data.length;
        // remove last item
        data.splice(len - 1, 1);
        var prev = data[len - 2];
        var start = prev[0];

        setTimeout(function () {
            $('.js-active').find('.item__title span.index').each(function (index) {
                var currentQ = parseInt(start) + index;
                $(this).text(currentQ);
                $('#hala').val(JSON.stringify(data));
            });
        }, 300);

        page_accept.pop();
        $('#accept').val(page_accept);
    }

    last_page = $(eventTarget).val();

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

  //open active panel
  setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

  const eventTarget = e.target;

  //check if we clicked on `PREV` or NEXT` buttons
  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
  {
    return;
  }

  //find active panel
  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

  //set active step and active panel onclick
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
      // nhấn nút prev

      var data = JSON.parse($('#hala').val());
      var len = data.length;
      // remove last item
      data.splice(len-1, 1);
      var prev = data[len-2];
      var start = prev[0];

      setTimeout(function() {
          // console.log($('.js-active > .item__title ').length);
          $('.js-active').find('.item__title span.index').each(function(index) {
              var currentQ = parseInt(start) + index;
              $(this).text(currentQ);
              $('#hala').val(JSON.stringify(data));
          });
      }, 300);
    activePanelNum--;
      page_accept.pop();
      $('#accept').val(page_accept);

  } else {
      //validate when click next button
      let required = $(eventTarget).parents().eq(1).find('input[name=question-required]').val();
      if(required == 1){
          if ($(eventTarget).parents().eq(1).find('input[name*=question][type=radio]:checked').length == 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=question][type=radio]').length != 0 ||
              $(eventTarget).parents().eq(1).find('input[name*=question][type=checkbox]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=question][type=checkbox]:checked').length == 0 ||
              $(eventTarget).parents().eq(1).find('input[name*=rate][type=text]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=rate][type=text]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=date-from][type=text]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=date-from][type=text]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=date-to][type=text]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=date-to][type=text]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=time-from][type=text]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=time-from][type=text]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=time-to][type=text]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=time-to][type=text]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=number][type=number]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=number][type=number]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=text][type=text]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=text][type=text]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*=number][type=number]').length != 0 &&
              $(eventTarget).parents().eq(1).find('input[name*=number][type=number]').val() == '' ||
              $(eventTarget).parents().eq(1).find('select[name*=select]').length != 0 &&
              $(eventTarget).parents().eq(1).find('select[name*=select]').val() == '' ||
              $(eventTarget).parents().eq(1).find('input[name*="sub-answer[]"][type=radio]:checked').length == 0 &&
              $(eventTarget).parents().eq(1).find('input[name*="sub-answer[]"][type=radio]').length != 0) {
              show_pnotify('Vui lòng chọn đáp án');
              return;
          }
      }

      // nhấn nút next
      var data = JSON.parse($('#hala').val());
      var len = data.length;
      var prev = data[len -1];
      var start = prev[1];

      setTimeout(function() {
          var tmp = [];
          $('.js-active').find('.item__title span.index').each(function(index) {

              var currentQ = parseInt(start) + index + 1;
              $(this).text(currentQ);
              tmp = [start + 1, currentQ];
          });

          if(tmp.length) {
              data.push(tmp);
              $('#hala').val(JSON.stringify(data));
          }
      }, 200);

    activePanelNum++;
      page_accept.push(activePanelNum + 1);
      $('#accept').val(page_accept);
  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);

});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);

//changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

// const setAnimationType = newType => {
//   DOMstrings.stepFormPanels.forEach(elem => {
//     elem.dataset.animation = newType;
//   });
// };

// //selector onchange - changing animation
// const animationSelect = document.querySelector('.pick-animation__select');

// animationSelect.addEventListener('change', () => {
//   const newAnimationType = animationSelect.value;

//   setAnimationType(newAnimationType);
// });
