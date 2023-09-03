/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "SCHOOL-DB ";
var stuRelationName = "STUDENT-TABLE";
var connToken = "90931241|-31949329218216400|90960916";

$("#rollno").focus();

function saveRecNo(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStuIdAsJsonObj() {
    var rollno = $("#rollno").val();
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo(jsonObj);
    var record  = JSON.parse(jsonObj.data).record;
    $("#stuname").val(record.name);
    $("#class").val(record.class);
    $("#dob").val(record.dob);
    $("#add").val(record.add);
    $("#enrolldate").val(record.enrolldate);
}

function resetForm() {
    $("#rollno").val("");
    $("#stuname").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#add").val("");
    $("#enrolldate").val("");
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
}

function validateData() {

    var rollno, stuname, stuclass, dob, add, enrolldate;
    rollno = $("#rollno").val();
    stuname = $("#stuname").val();
    stuclass = $("#class").val();
    dob = $("#dob").val();
    add = $("#add").val();
    enrolldate = $("#enrolldate").val();

    if (rollno === '') {
        alert("Student Roll no. missing");
        $("#rollno").focus();
        return "";
    }
    if (stuname === "") {
        alert("Student Name Missing");
        $("#stuname").focus();
        return "";
    }
    if (stuclass === "") {
        alert("Class missing");
        $("#class").focus();
        return "";
    }
    if (dob === "") {
        alert("Date of Birth Missing");
        $("#dob").focus();
        return "";
    }
    if (add === "") {
        alert("DA missing");
        $("#add").focus();
        return "";
    }
    if (enrolldate === "") {
        alert("Enrollment Date Missing");
        $("#enrolldate").focus();
        return "";
    }

    var jsonStrObj = {

        id: rollno,
        name: stuname,
        class: stuclass,
        dob: dob,
        add: add,
        enrolldate: enrolldate
    };
    return JSON.stringify(jsonStrObj);
}

function getStu() {
    var empIdJsonObj = getStuIdAsJsonObj();
            var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();

    } else if (resJsonObj.status === 200) {

        $("#rollno").prop("diabled", true);
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }

    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function updateData() {
    $("#update").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseURL(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();

    $("#rollno").focus();
}
