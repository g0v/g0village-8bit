/**
 * Created with JetBrains PhpStorm.
 * User: rack
 * Date: 13/8/8
 * Time: PM9:41
 * To change this template use File | Settings | File Templates.
 */
window.Hero = {
    name: 'unnamed',
    contributions: 100,
    followers: 10,
    gameFlags: {}
};

window.Boss = {
    avatar: "assets/clkao.png",
    name: '高村長',
    contributions: 2165,
    followers: 178,
    attackSkills: [
        {msg: "<%= Boss.name %> 普通攻擊 <%= Player.name %>, 造成了 [ <%= Point %> ] 傷害", type: 'attack', delta: 1},
        {msg: "<%= Boss.name %> 挖了個坑 , <%= Player.name %> 不小心掉下去, 造成了 [ <%= Point %> ] 傷害", type: 'attack', delta: 2},
        {msg: "<%= Boss.name %> 丟出機械鍵盤攻擊 <%= Player.name %>, 造成了 [ <%= Point %> ] 傷害", type: 'attack', delta: 5},
        {msg: "<%= Boss.name %> 丟出 MBPR 攻擊 <%= Player.name %>, 造成了 [ <%= Point %> ] 傷害", type: 'attack', delta: 10},
        {msg: "<%= Boss.name %> 喝了一瓶咖啡, HP 回復了 [ <%= Point %> ] ", type: 'health', delta: 2, count: 10, limit_msg: "<%= Boss.name %> 喝完了冰箱中的所有咖啡了。" },
        {msg: "<%= Boss.name %> 喝了一瓶馬力夯, HP 回復了 [ <%= Point %> ] ", type: 'health', delta: 5, count: 5, limit_msg: "<%= Boss.name %> 喝完了家裡的所有馬力夯了。"}
    ]
};


window.HeroPartner = {
    name: 'unnamed2',
    contributions: 100,
    followers: 10
};

window.GithubPartners = [
    {
        name: 'racklin',
        contributions: 396,
        followers: 45,
        bio: '我是阿土伯，我是新手村的掃地僧！'
    },
    {
        name: 'hlb',
        contributions: 356,
        followers: 95,
        bio: '我是售票亭老板，先不管售票亭，你聽過 Fire.app 嗎？'
    },
    {
        name: 'ETBlue',
        contributions: 181,
        followers: 13,
        bio: 'ETBlue'
    },
    {
        name: 'Superbil',
        contributions: 42,
        followers: 6,
        bio: '我是超級帳單，你還有超級多未付款的帳單，快付錢！'
    },
    {
        name: 'audreyt',
        contributions: 1334,
        followers: 458,
        bio: '我會把高村長萌化！'
    },
    {
        name: 'c9s',
        contributions: 6673,
        followers: 548,
        bio: '我手受傷了！'
    },
    {
        name: 'clkao',
        contributions: 2165,
        followers: 178,
        bio: '疑～'
    },
    {
        name: 'evenwu',
        contributions: 156,
        followers: 84,
        bio: '我是裝置藝術師！我會丟冰寶！'
    },
    {
        name: 'kcwu',
        contributions: 2281,
        followers: 5,
        bio: '我有黃色眼鏡，可以用電腦用的比你久！'
    }
];
