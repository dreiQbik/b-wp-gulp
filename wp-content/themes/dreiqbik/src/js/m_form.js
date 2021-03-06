/******************************************************************
    M_FORM.JS

        > VARS
        > EVENTS
        > FUNCTIONS
        > PUBLIC_FUNCTIONS

******************************************************************/


var mForm = (function($) {


    /******************************************************************
        VARS
    ******************************************************************/

    // get all input fields and trigger float labels on focus
    var $formInputs = $('.m_form__input');

    // quit if element does not exist (on this page)
    if (!$formInputs.length) return;


    /******************************************************************
        EVENTS
    ******************************************************************/

    // remove label classes and return to initial state after form was sent successfully
    $(document).on('.btn', returnToInitialState);

    $formInputs.on('focusin', makeLabelActive);
    $formInputs.on('focusout', makeLabelInactive);


    /******************************************************************
        FUNCTIONS
    ******************************************************************/

    function makeLabelActive() {

        var $activeInput = $(this);
        var $activeFormLabel = $activeInput.parents('p').find('.m_form__label');

        // add active state
        $activeFormLabel.addClass('active');
    }

    function makeLabelInactive() {

        var $activeInput = $(this);
        var $activeFormLabel = $activeInput.parents('p').find('.m_form__label');

        // remove active state
        $activeFormLabel.removeClass('active');

        // check if field isn't empty and add done state
        if ($activeInput.val() && $activeInput.val().length) {
            $activeFormLabel.addClass('done');

        // return to initial state if field is empty
        } else {
            $activeFormLabel.removeClass('done');
        }
    }

    function returnToInitialState() {
        var $formLabels = $('.m_form__label');
        $formLabels.removeClass('active done');
    }

})(jQuery);
