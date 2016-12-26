class FormConstructor {
    constructor() {
        this.form = {};
    }

    addForm(name, regEx) {
        let badNameCheck = '\\b' + name + '\\b';
        let form = Object.keys(this.form);
        this.clearConstructor();

        if (!(name === '' || form.length === 8 || //limit exceeded
                new RegExp(badNameCheck, 'i').test(form.join(' ')))) { //if unique
            this.form[name] = regEx;

            let lastFormId = Object.keys(this.form).length - 1;
            let newFormId = Object.keys(this.form)[lastFormId];
            $($.parseHTML('<li><label>' + newFormId + '</label> <input type="text" id =' + newFormId +
                '> </li>')).appendTo("#spaceReservedForForms");
        }
    }

    validate() {
        // let validCount = 0;   //Uncomment validCount to for tests
        $.each(this.form, function(locator, regex) {
            let newReg = new RegExp(regex);

            if (newReg.test($("#" + locator).val())) {
                $("#" + locator).removeClass('red').addClass('green');
                // validCount++;
            } else {
                $("#" + locator).removeClass('green').addClass('red');
            }
        });
        // if (validCount === Object.keys(this.form).length) return true;
    }


    clearConstructor() {
        $("#idConstructor").val('');
        $("#regExpConstructor").val('');
    }
    clearForm() {
        $("#spaceReservedForForms").html('');
        this.form = {};
    }

}


let form = new FormConstructor();

let add = function() {
    form.addForm($("#idConstructor").val(), $("#regExpConstructor").val());
}

let clear = function() {
    form.clearForm();
}

let validate = function() {
    form.validate();
}