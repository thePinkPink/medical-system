jQuery(".nav").slide({ 
type:"menu", //效果类型
titCell:".m", // 鼠标触发对象
targetCell:".sub", // 效果对象，必须被titCell包含
effect:"slideDown",//下拉效果
delayTime:300, // 效果时间
triggerTime:0 //鼠标延迟触发时间
});


jQuery(".sub").slide({ 
type:"menu", //效果类型
titCell:".n", // 鼠标触发对象
targetCell:".sub2", // 效果对象，必须被titCell包含
effect:"slideDown",//下拉效果
delayTime:400, // 效果时间
triggerTime:0 //鼠标延迟触发时间
});