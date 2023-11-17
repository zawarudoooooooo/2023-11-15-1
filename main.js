let obj = {};
let timeArr=[];
fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-5FA645EA-BBB9-4EDF-AD57-84C2F0275943")
.then(response => response.json())
.then(data =>{
    console.log(data)
    obj = data;
    timeArr=data.records.location[0].weatherElement[0].time
    timeArr.forEach((item,index)=>{
        selectTime.innerHTML += `<option value=${index}>${item.startTime}</option>\n`
    })
})

const selectCity = document.getElementById("selectCity")
const selectTime = document.getElementById("selectTime")
const locationCity = document.getElementById("locationCity")
const weatherCondition = document.getElementById("weatherCondition")
const minTem = document.getElementById("minTem")
const maxTem = document.getElementById("maxTem")
const rainyPercent = document.getElementById("rainyPercent")
const img = document.getElementById("img")

let weatherInfo=[];

selectCity.addEventListener('change', ()=>{
    obj.records.location.forEach(item=>{
        if(selectCity.value==item.locationName){
            locationCity.innerText=item.locationName;
            weatherInfo=item.weatherElement;
            console.log(locationCity.innerText)
            console.log(weatherInfo)
        }
    })
})

selectTime.addEventListener('change', ()=>{
    let Wx = [];
    let minT = [];
    let maxT = [];
    let PoP = [];

    weatherInfo.forEach((item,index)=>{

        switch(index){
            case 0 :
                Wx = item;
                break;
            case 1 :
                PoP = item;
                break;
            case 2 :
                minT = item;
                break;
            case 4 :
                maxT = item;
                break;
        }
    })
    weatherCondition.innerText=Wx.time[selectTime.value].parameter.parameterName;
    minTem.innerText=minT.time[selectTime.value].parameter.parameterName+"-";
    maxTem.innerText=maxT.time[selectTime.value].parameter.parameterName+"℃";
    rainyPercent.innerText="降雨機率 : "+PoP.time[selectTime.value].parameter.parameterName+"%";

    console.log("晴"+weatherCondition.innerText.indexOf("晴"));
    console.log("陰"+weatherCondition.innerText.indexOf("陰"));
    console.log("雲"+weatherCondition.innerText.indexOf("雲"));
    console.log("雨"+weatherCondition.innerText.indexOf("雨"));

    if(weatherCondition.innerText.indexOf("晴")>=0){
        img.src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/01.svg"
    }
    if(weatherCondition.innerText.indexOf("陰")>=0){
        img.src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/07.svg"
    }
    if(weatherCondition.innerText.indexOf("雲")>=0){
        img.src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/03.svg" 
    }
    if(weatherCondition.innerText.indexOf("雨")>=0){
        img.src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/08.svg" 
    }
})