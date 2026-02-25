window.titleScreenScene = function () {
    loadManager = Crafty.e("AssetLoadManager");
    // add music
    Crafty.audio.add("introMusic",
        ["assets/people-sing.mp3", "assets/people-sing.ogg"]);
    Crafty.audio.play("introMusic", -1);
    Crafty.background("black");

    var vw = Crafty.viewport.width;
    var vh = Crafty.viewport.height;
    var isMobile = !!(Crafty.mobile || ('ontouchstart' in window) || navigator.maxTouchPoints > 0);

    // DOM modal for name input (works reliably on mobile & desktop)
    function showNameInput(callback) {
        var overlay = document.createElement('div');
        overlay.style.cssText = [
            'position:fixed', 'inset:0',
            'background:rgba(0,0,0,0.88)',
            'display:flex', 'flex-direction:column',
            'align-items:center', 'justify-content:center',
            'z-index:9999', 'font-family:monospace'
        ].join(';');

        var label = document.createElement('div');
        label.textContent = '勇者，你叫什麼名字？';
        label.style.cssText = 'color:#ffeb42;font-size:20px;margin-bottom:20px;text-align:center;padding:0 16px;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '輸入名字';
        input.maxLength = 20;
        input.style.cssText = [
            'font-size:20px', 'padding:10px 16px',
            'border-radius:4px', 'border:2px solid #ffeb42',
            'background:#111', 'color:#fff',
            'text-align:center', 'width:220px',
            'outline:none', 'margin-bottom:20px',
            'font-family:monospace', 'box-sizing:border-box'
        ].join(';');

        var btn = document.createElement('button');
        btn.textContent = '確定出發！';
        btn.style.cssText = [
            'font-size:18px', 'padding:12px 36px',
            'background:#ffeb42', 'color:#111',
            'border:none', 'border-radius:4px',
            'cursor:pointer', 'font-family:monospace',
            'font-weight:bold'
        ].join(';');

        overlay.appendChild(label);
        overlay.appendChild(input);
        overlay.appendChild(btn);
        document.body.appendChild(overlay);

        setTimeout(function() { input.focus(); }, 100);

        function confirm() {
            var name = input.value.trim() || '勇者';
            if (overlay.parentNode) document.body.removeChild(overlay);
            callback(name);
        }

        btn.addEventListener('click', confirm);
        btn.addEventListener('touchend', function(e) { e.preventDefault(); confirm(); });
        input.addEventListener('keydown', function(e) { if (e.keyCode === 13) confirm(); });
    }

    //creates the sprites
    Crafty.sprite(240, "assets/g0v-240-invert.png", {
        personalogo: [0, 0]
    });

    logo = Crafty.e("2D, Canvas, personalogo, Tween");
    blackbg = Crafty.e("2D, Canvas, Color, Tween").attr({
        x: 0,
        y: 0,
        h: vh,
        w: vw,
        alpha: 1
    }).color("black");
    blackbg.z = 3;
    logo.z = 2;
    logo.x = Math.floor((vw - 240) / 2);
    logo.y = Math.floor(vh * 0.23);

    // Hint text DOM element
    var hintEl = document.createElement('div');
    hintEl.style.cssText = [
        'position:fixed', 'left:0', 'right:0',
        'bottom:' + Math.floor(vh * 0.25) + 'px',
        'text-align:center', 'color:#fff',
        'font-size:' + (isMobile ? '22px' : '16px'),
        'font-family:monospace', 'letter-spacing:3px',
        'pointer-events:none', 'z-index:200', 'opacity:0'
    ].join(';');
    hintEl.textContent = isMobile ? '點擊螢幕開始' : 'PRESS ENTER';
    document.body.appendChild(hintEl);

    function startGame() {
        if (startGame._called) return;
        startGame._called = true;
        if (hintEl.parentNode) hintEl.parentNode.removeChild(hintEl);

        showNameInput(function(heroName) {
            Hero.name = heroName;

            // Firebase disabled — guard against undefined herosFBRef
            try {
                if (window.herosFBRef) {
                    window.herosFBRef.child(Hero.name).set(Hero);
                }
            } catch(e) {}

            Crafty.audio.muteMusic('introMusic');

            loadManager.loadScene(["assets/yosukehappy.png", "assets/yosukesad.png", "assets/clkaoask.png", "assets/clkaoangry.png", "assets/tree.png", "assets/palmTree.png", "assets/rock.png", "assets/bush.png", "assets/smalltree.png", "assets/background.png", "assets/tileset32.png", "assets/darkbackground.png", "assets/orangebackground.png", "assets/clkaosprite.png", "assets/igor.png", "assets/kanji.png", "assets/kanjiangry.png", "assets/kanjiconfused.png", "assets/soujisprite.png", "assets/teddie.png", "assets/teddiehappy.png", "assets/teddiesad.png", "assets/yosukesprite.png", "assets/moe.png", "assets/moesprite.png", "assets/clkao.png", "assets/yosuke.png", "assets/clkaohungry.png", "assets/hlb.png", "assets/racklinsprite.png", "assets/racklin.png", "assets/mouinfo.png", "assets/mouinfosprite.png", "assets/listening.png", "assets/listeningsprite.png", "assets/etblue.png", "assets/etbluesprite.png"], "overworld");
        });
    }

    blackbg.tween({ alpha: 0 }, 50, function() {
        blackbg.destroy();

        // Pulse hint
        var pulseOn = true;
        var pulseTimer = setInterval(function() {
            hintEl.style.opacity = pulseOn ? '1' : '0.3';
            pulseOn = !pulseOn;
        }, 500);

        function onStart(e) {
            if (e && e.preventDefault) e.preventDefault();
            clearInterval(pulseTimer);
            document.removeEventListener('click', onStart);
            document.removeEventListener('touchend', onStart);
            startGame();
        }

        // Keyboard: Enter
        Crafty.e("Keyboard").bind("KeyDown", function(e) {
            if (e.key === 13) {
                clearInterval(pulseTimer);
                startGame();
            }
        });

        // Bind to document — catches touch regardless of which layer is on top
        document.addEventListener('click', onStart);
        document.addEventListener('touchend', onStart, { passive: false });

        logo.tween({ y: Math.floor(vh * 0.11) }, 50, function() {
            hintEl.style.opacity = '1';
        });
    });

    Crafty.background("#ffeb42");
};
