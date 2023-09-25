var btn_ok = document.querySelectorAll('.btn_ok');

btn_ok.forEach(function (element, index) {
    element.onclick = () => {
        document.querySelectorAll('.label_inp')[index].disabled = true;
        document.querySelectorAll('.user_input')[index].disabled = true;
    }
})

var title_text;
var desc_text;
var item_count;
var _data;
var data_name;

function organiseData() {
    title_text = document.querySelectorAll('.label_inp');
    desc_text = document.querySelectorAll('.user_input');
    data_name = document.querySelector('.data_name').value;

    if (document.querySelector('.data_name').value.trim() !== "") {
        _data = { data_names: [] }

        _data_val = { _tit: [], _desc: [], 'data_name': data_name }

        title_text.forEach(function (element) {
            _data_val._tit.push(element.value);
        })
        desc_text.forEach(function (element) {
            _data_val._desc.push(element.value);
        })
        _data[data_name] = _data_val
        _data.data_names.push(data_name)

        console.log(_data)

        saveData()
    }
    else{
        alert('Please provide data name')
    }
}

function saveData() {
    if (localStorage.getItem('data') == null) {
        new_data = _data;
        localStorage.setItem('data', JSON.stringify(new_data));
        alert("====== DATA SAVED SUCCESSFULLY ======");
    }
    else {
        old_data_str = localStorage.getItem('data')
        old_data = JSON.parse(old_data_str);
        new_data = _data_val;
        old_data[data_name] = new_data
        old_data.data_names.push(data_name)
        localStorage.setItem('data', JSON.stringify(old_data))
        alert("====== DATA SAVED SUCCESSFULLY ======");
    }
    location.reload();
}

//Variables for below function
var options = "";
var show_option_box = document.querySelector('.select_options');
var table_body = "";
var elem_container = document.querySelector('.element_container');

function show_data() {
    if (localStorage.getItem('data') == null) {
        alert('=====NO DATA SAVED======')
    }
    else {
        ret_data_str = localStorage.getItem('data');
        ret_data = JSON.parse(ret_data_str);

        //Retriving data names and showing it
        ret_data.data_names.forEach(function (element, index) {
            options += `<div class="select_row">${index + 1})  Data Name :- <span class="opt_name">${element}</span></div>`;
        })
        show_option_box.innerHTML = options;

        //Showing data when a option is clicked
        var title_elem = "";
        var desc_elem = "";
        var elem_index = "";
        var shown_options_value = document.querySelectorAll('.select_row .opt_name');
        shown_options_value.forEach(function (element) {
            element.onclick = () => {
                Object.assign(document.querySelector('.select_data_box').style, css.hide);
                document.querySelector('.select_data_box').style.height = '0';
                Object.assign(document.querySelector('.show_data_row').style, css.show);

                document.querySelector('.data_name_shown').innerHTML = element.innerHTML;
                //Title
                ret_data[element.innerHTML]._tit.forEach(function get_title(element, index) {
                    title_elem += `
                    <span class="title_elem">${element}</span>`
                    elem_index += `<span class="serial_no_elem">${index + 1}</span>`
                });
                ret_data[element.innerHTML]._desc.forEach(function get_desc(element) {
                    desc_elem += `<span class="desc_elem">${element}</span>`
                })
                table_body = `<div class="element">
                   <div class="serial_no">${elem_index}</div>
                   <div class="title">${title_elem}</div>
                   <div class="desc">${desc_elem}</div>
               </div>`
                elem_container.innerHTML = table_body
            }
        })
    }
}

// Accessing buttons & Switching between tabs ---
var display = document.querySelector('.display');
var btn_ctrl = document.querySelectorAll('.btn_ctrl');
var css = {
    'show': {
        'visibility': 'visible',
        'opacity': '1',
        'width': '100%',
        'transform': 'translate(0px, 0px)'
    },
    'hide': {
        'visibility': 'hidden',
        'opacity': '0',
        'width': '0',
        'transform': 'translate(-700px, 0px)'
    }
}
btn_ctrl.forEach((element) => {
    element.onclick = () => {
        if (element.classList.contains('btn_create_data')) {
            Object.assign(document.querySelector('.default_display').style, css.hide);
            Object.assign(document.querySelector('.preview_display').style, css.hide);
            Object.assign(document.querySelector('.input_display').style, css.show);
            document.querySelector('.btn_save').style.display = 'block';
        }
        if (element.classList.contains('btn_view_data')) {
            Object.assign(document.querySelector('.default_display').style, css.hide);
            Object.assign(document.querySelector('.preview_display').style, css.show);
            Object.assign(document.querySelector('.input_display').style, css.hide);
            document.querySelector('.preview_display').classList.remove('hidden_display');
            document.querySelector('.btn_save').style.display = 'none';
            show_data();
        }
        if (element.classList.contains('btn_save')) {
            organiseData();
        }
        if (element.classList.contains('btn_clear_storage')) {
            if (confirm('Pressing OK will clear all your data. Do you really want to ERASE ALL saved data from the storage?')) {
                localStorage.clear();
                alert('====== DATA CLEARED SUCCESSFULLY ======');
                location.reload();
            }
        }
    }
})

function addField() {
    var field = `<div class="inp_box">
    <input class="label_inp" placeholder="Title" value="title4"><span
        class="separator">:-</span><input class="user_input" placeholder="Descripton"
        value="descriptin4"><button class="inp_box_btn btn_ok">Ok</button>
</div>`
    document.querySelector('.input_elems').innerHTML += field
}

// document.querySelectorAll('.design_block')[3].style.top = '100px'
// if (show_title.length < item_count || show_desc.length < item_count) {
    //     for (i = 1; i < item_count; i++) {
    //         var show_title_elem = document.createElement('span');
    //         var show_desc_elem = document.createElement('span')
    //         show_title_elem.classList.add('show_title')
    //         show_desc_elem.classList.add('show_desc');
    //         document.querySelector('.title_row').appendChild(show_title_elem);
    //         document.querySelector('.desc_row').appendChild(show_desc_elem);
    //     }
    //     console.log((document.querySelectorAll('.show_title').length) + ' Rows')
    // }