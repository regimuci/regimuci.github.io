function findIpDetails() {
    var first = parseInt(document.getElementById("first").value);
    var second = parseInt(document.getElementById("second").value);
    var third = parseInt(document.getElementById("third").value);
    var fourth = parseInt(document.getElementById("fourth").value);
    var cidr = parseInt(document.getElementById("cidr").value);
    var output = document.getElementById("output");
    if(first<0 || first>255 || second<0 || second>255 || third<0 || third>255 || fourth<0 || fourth>255 || cidr<0 || cidr>32
        ||isNaN(first) || isNaN(second) ||isNaN(third) || isNaN(fourth) || isNaN(cidr)){
        output.innerHTML="Incorrect IP";
    }
    else {
        var netId = findNetworkID(cidr,first,second,third,fourth);
        var broadcast = findBroadcast(cidr,first,second,third,fourth);
        var subnetMask = findSubnetMask(cidr);
        output.innerHTML="Network ID = "+netId+"<br>"+"Broadcast = "+broadcast+"<br>"+"SubnetMask = "+ subnetMask;
    }
}

function compare() {
    var firstIp1 = parseInt(document.getElementById("firstIp1").value);
    var secondIp1 = parseInt(document.getElementById("secondIp1").value);
    var thirdIp1 = parseInt(document.getElementById("thirdIp1").value);
    var fourthIp1 = parseInt(document.getElementById("fourthIp1").value);
    var cidrIp1 = parseInt(document.getElementById("cidrIp1").value);

    var firstIp2 = parseInt(document.getElementById("firstIp2").value);
    var secondIp2 = parseInt(document.getElementById("secondIp2").value);
    var thirdIp2 = parseInt(document.getElementById("thirdIp2").value);
    var fourthIp2 = parseInt(document.getElementById("fourthIp2").value);
    var cidrIp2 = parseInt(document.getElementById("cidrIp2").value);

    var output = document.getElementById("output2");

    if(firstIp1<0 || firstIp1>255 || secondIp1<0 || secondIp1>255 || thirdIp1<0 || thirdIp1>255 || fourthIp1<0 || fourthIp1>255
        || cidrIp1<0 || cidrIp1>32 ||isNaN(firstIp1) || isNaN(secondIp1) ||isNaN(thirdIp1) ||isNaN(fourthIp1) || isNaN(cidrIp1)){
        output.innerHTML="Incorrect IP1";
    }
    else if(firstIp2<0 || firstIp2>255 || secondIp2<0 || secondIp2>255 || thirdIp2<0 || thirdIp2>255 || fourthIp2<0 || fourthIp2>255
        || cidrIp2<0 || cidrIp2>32 || isNaN(firstIp2) || isNaN(secondIp2) ||isNaN(thirdIp2) || isNaN(fourthIp2) || isNaN(cidrIp2)){
        output.innerHTML="Incorrect IP2";
    }
    else {
        var netId1 = findNetworkID(cidrIp1,firstIp1,secondIp1,thirdIp1,fourthIp1);
        var netId2 = findNetworkID(cidrIp2,firstIp2,secondIp2,thirdIp2,fourthIp2);
        if(netId1===netId2){
            output.innerHTML="IP1 and IP2 are at the same network";
        }
        else {
            output.innerHTML="IP1 and IP2 are not at the same network";
        }
    }
}

// input(number) -> output(string)
function convertTo8BitBinary(n) {
    var bin = (n).toString(2);
    var length = bin.length;
    for(var i=length;i<8;i++){
        bin = 0 + bin;
    }
    return bin;
}

// input(string) -> output(number)
function convertToDecimal(n) {
    return parseInt(n,2);
}

function findNetworkID(cidr,first,second,third,fourth) {
    var networkID;
    if (cidr < 8) {
        var newFirst = makeZeroOrOne(cidr,first,"0");
        networkID = convertToDecimal(newFirst) + ".0.0.0";
    }
    else if(cidr >=8 && cidr <16){
        var newSecond = makeZeroOrOne(cidr,second,"0");
        networkID = first+"."+convertToDecimal(newSecond)+".0.0";
    }
    else if(cidr >=16 && cidr <24){
        var newThird = makeZeroOrOne(cidr,third,"0");
        networkID = first+"."+second+"."+convertToDecimal(newThird)+".0";
    }
    else if(cidr>=24 && cidr<=32){
        var newForuth = makeZeroOrOne(cidr,fourth,"0");
        networkID = first+"."+second+"."+third+"."+convertToDecimal(newForuth);
    }
    else {
        return "Error";
    }
    return networkID;
}

function findBroadcast(cidr,first,second,third,fourth) {
    var broadcast;
    if (cidr < 8) {
        var newFirst = makeZeroOrOne(cidr,first,"1");
        broadcast = convertToDecimal(newFirst) + ".255.255.255";
    }
    else if(cidr >=8 && cidr <16){
        var newSecond = makeZeroOrOne(cidr,second,"1");
        broadcast = first+"."+convertToDecimal(newSecond)+".255.255";
    }
    else if(cidr >=16 && cidr <24){
        var newThird = makeZeroOrOne(cidr,third,"1");
        broadcast = first+"."+second+"."+convertToDecimal(newThird)+".255";
    }
    else if(cidr>=24 && cidr<=32){
        var newForuth = makeZeroOrOne(cidr,fourth,"1");
        broadcast = first+"."+second+"."+third+"."+convertToDecimal(newForuth);
    }
    else {
        return "Error";
    }
    return broadcast;
}

function makeZeroOrOne(cidr,input,inp){
    var bin = convertTo8BitBinary(input);
    var out = "";
    for (var i = 0; i < 8; i++) {
        if (i < (cidr%8)) {
            out = out + bin.charAt(i);
        }
        else{
            out = out + inp;
        }
    }
    return out;
}

function findSubnetMask(cidr) {
    var subnetMask;
    if (cidr < 8) {
        var newFirst = makeZeroOrOneForSubnet(cidr);
        subnetMask = convertToDecimal(newFirst) + ".0.0.0";
    }
    else if(cidr >=8 && cidr <16){
        var newSecond = makeZeroOrOneForSubnet(cidr);
        subnetMask = "255"+"."+convertToDecimal(newSecond)+".0.0";
    }
    else if(cidr >=16 && cidr <24){
        var newThird = makeZeroOrOneForSubnet(cidr);
        subnetMask = "255.255"+"."+convertToDecimal(newThird)+".0";
    }
    else if(cidr>=24 && cidr<=32){
        var newForuth = makeZeroOrOneForSubnet(cidr);
        subnetMask = "255.255.255."+convertToDecimal(newForuth);
    }
    else {
        return "Error";
    }
    return subnetMask;
}

function makeZeroOrOneForSubnet(cidr){
    var out = "";
    for (var i = 0; i < 8; i++) {
        if (i < (cidr%8)) {
            out = out + "1";
        }
        else{
            out = out + "0";
        }
    }
    return out;
}

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength)
    }
}