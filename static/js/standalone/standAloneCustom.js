/**
 * Created by Alicia on 2015-02-18.
 */
/* Stand Alone 코드 알고리즘 */
var canvas, code, jsCode, processingInstance;
// jQuery ready
$(function(){

    console.log("processing.js ready");

    // init value
    canvas = document.getElementById('renderer');
    code = document.getElementById('code');

    // code mirror
    CodeMirror.commands.autocomplete = function(cm) {
        cm.showHint({hint: CodeMirror.hint.anyword});
    };

    var myCodeMirror = CodeMirror.fromTextArea(code,{
        lineNumbers: true,  // 라인 넘버 표시
        matchBrackets: true, // 블럭 매칭
        styleActiveLine: true, // 현재 라인 표시
        scrollbarStyle: "simple", // Scrollbar Style
        autoCloseBrackets: true, // 자동 가로 닫기
        tabSize : 2,    // 들여쓰기
        mode : {name :"text/x-java", globalVars: true },
        lineWrapping: true,
        foldGutter : true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys : {
            // code assist 추가
            "Ctrl-Space" : "autocomplete",
            //full screen
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        }


    });

    // init Canvas text
    var initTextArea= "// setup area \nvoid setup(){\n  size(500,500);\n\n} \n\n// draw area \nvoid draw(){\n\n}";
    myCodeMirror.setValue(initTextArea);

    /********************* Run Event Define Start **************************/
    function createCanvas(){
        var container = document.getElementById('container');
        var renderer = document.getElementById('renderer');
        container.removeChild(renderer);

        renderer = document.createElement('canvas');
        renderer.id = 'renderer';
        container.appendChild(renderer);

        return renderer;
    }
    //
    function run(){
        canvas = createCanvas();
        console.log(myCodeMirror.getValue());
        var render = Processing.compile(myCodeMirror.getValue());
        processingInstance = new Processing(canvas,render);
    }

    /********************* Run Event Define End**************************/

    // Run Button Event
    $('#runBtn').on('click',function(){
       console.log('run event occur');
        run();
    });

    // Reset Button Event
    $('#resetBtn').on('click', function () {
        console.log('reset event occur');
        myCodeMirror.setValue(initTextArea); // text area reset
        run();
    });
});