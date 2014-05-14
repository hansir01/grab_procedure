/* 价格走势(3项选择) */
function show_menuzs(num){
	for(i = 0; i < 100; i++){
		if(document.getElementById('zsli0' + i)){
			document.getElementById('zsli0' + i).style.display = 'none';
			document.getElementById('zsf0' + i).style.color = '';
			document.getElementById('zsf0' + i).className = 'zstitletd';
		}
	}
	document.getElementById('zsli0' + num).style.display = 'block';
	document.getElementById('zsf0' + num).className = 'zstitletda';
}

function openPriceList(){
	document.getElementById('priceListOpen').style.display = 'block';
	document.getElementById('priceListClose').style.display = 'none';
}

function closePriceList(){
	document.getElementById('priceListOpen').style.display = 'none';
	document.getElementById('priceListClose').style.display = 'block';
}