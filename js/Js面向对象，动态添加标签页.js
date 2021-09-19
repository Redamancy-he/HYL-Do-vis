var that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        // section的父元素
        this.div = this.main.querySelector('.tabscon');
        this.init();
    }

    init() {
        // 初始化函数,绑定点击事件
        this.updateNode();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    // 1.切换功能
    toggleTab() {
        // console.log(this);this谁调用，指向谁
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';//谁点击给谁添加这个类
        that.sections[this.index].className = 'conactive';

    }
    // 清除类函数
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2.添加功能 点击'+'添加新的选项卡和内容,创建新元素，追加到父元素中
    addTab() {
        that.clearClass();
        // 1.创建新的li元素
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">新section' + Math.floor(Math.random() * 10) + '</section>';
        // 2.创建的元素追加到父元素中 新方法insertAdjacentHTML   
        that.ul.insertAdjacentHTML('beforeend', li);
        that.div.insertAdjacentHTML('beforeend', section);
        that.init();

    }
    // 3.删除功能
    // 删除的时候，索引号来自li的索引号
    // 点击事件时，会有冒泡行为，关闭的同时，会触发li的点击切换事件，所以要阻止冒泡
    removeTab(e) {
        // 根据索引号删除对应的li和section
        e.stopPropagation();
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当删除的不是选中状态的li时，原来的选中状态的页面不需要跳转
        // 判断如果能选出当前的li，说明li当前标签存在，return; 不执行自动选中前一个标签
        if (document.querySelector('.liactive')) return;
        // 当删除选中状态的li时，自动选中前一个，自动调用点击
        index <= 0 ? index = 0 : index--;
        that.lis[index] && that.lis[index].click();
        // that.lis[index].className = 'liactive';
        // that.sections[index].className = 'conactive';
    }
    // 4.修改功能
    editTab() {
        var str = this.innerHTML;
        // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();//自动将文本框的文字处于选中状态
        // 当鼠标失去焦点时，将文本框的值赋值给span
        input.onblur=function(){
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车
        input.onkeyup=function(e){
            if(e.keyCode==13){
                // this.parentNode.innerHTML = this.value;
                this.blur();//自动调用鼠标失去焦点
            }
        }
    }

}

new Tab('#tab')