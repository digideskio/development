// this is used to turn the long .Txt files in actual scores.
// first we load the keywords for criteria and attacks: 

var mots=[];
d3.text("mots.txt", function(txt) {
	txt.split("\n").forEach(function(line) {
		mot=line.split("\t");

		// since the words they run against are stemmed, the keywords
		// are stemmed too.
		
		var stemW=mot[1].split(" ");
		stemW=stemW.map(stemmer);
		
		mots.push({critere:mot[0],mots:stemW});
	});
});

var attacks=[];
d3.text("attack.txt", function(txt) {
	txt.split("\n").forEach(function(line) {
		mot=line.split("\t");
		attacks.push(mot);
	});
});


var PT=[];
var index=0;
var rows=["category","account","date","text","id_str"];

// now we load the main tweet file.

d3.text("politweets.txt", function(txt) {
	txt.split("\n").forEach(function(l) {
		var tweet={};
		l.split("\t").forEach(function(c,i) {tweet[rows[i]]=c;});
		var score={};

		// removing punctuation
		var textS=tidy(tweet.text);
		// and doing basic tokenization, the kind that works best on tweets
		
		textS=textS.split(" ");
		
		// then words are stemmed.
		textS=textS.map(stemmer);
		
		// this will check for each word or expression in the set of words of each tweet.
		var wordsInTweets=textS.length;	
		textS.forEach(function(s,i) {
				mots.forEach(function(m) {
					var l=m.mots.length;
					if (!score[m.critere]) {score[m.critere]=0;}
					if(l+i<wordsInTweets){
					
						// this is an obsfuscated formula. what it does is: 
						// from the i-th stemmed word in the textS array, 
						// check that each of the next l words is similar to the l words of 
						// the scoring word, m.mots (also an array). 
						// if this is true, then 1 (~~true) is added to the score of this tweet
						// for the relevant criteria (from m.critere).
					
						score[m.critere]+=~~(d3.range(l).every(function(j) {return textS[i+j]==m.mots[j];}));
					}
				});
			});
		tweet["score"]=score;
		var myDateObj=new Date(tweet.date);
		tweet["day"]=myDateObj.getFullYear()+"-"+(myDateObj.getMonth()+1)+"-"+myDateObj.getDate();
		tweet["id"]=index++;
		PT.push(tweet);
		
	})
});

// now this handles the attacks from one candidate to another.
// first we figure out where they belong.

camp={
	"evajoly":1,
	"Francetv2012":-1,
	"UMP":4,
	"jeunesump":4,
	"jf_cope":4,
	"FLefebvre_UMP":4,
	"vpecresse":4,
	"VRossoDebord":4,
	"DeputeTardy":4,
	"franckriester":4,
	"lauredlr":4,
	"MLP_officiel":5,
	"modem":3,
	"yannwehrling":3,
	"democrates":3,
	"jlbennahmias":3,
	"TF1News_Select":-1,
	"FN_officiel":5,
	"FNJ_officiel":5,
	"partisocialiste":2,
	"pierremoscovici":2,
	"aurelifil":2,
	"vincent_peillon":2,
	"faureolivier":2,
	"frebsamen":2,
	"marisoltouraine":2,
	"najatvb":2,
	"delphinebatho":2,
	"vincentfeltesse":2,
	"EELV":1,
	"CecileDuflot":1,
	"JVPlace":1,
	"DominiqueVoynet":1,
	"yjadot":1,
	"julienbayou":1,
	"fhollande":2,
	"libe_2012":-1,
	"SARKOZY_2012":4,
	"bayrou":3,
	"lemonde_pol":-1,
	"LeFigaro_News":-1,
	"melenchon2012":0,
	"leilachaibi":0,
	"IanBrossat":0,
	"Dartigolles":0,
	"FrontDeGauche":0,
	"PlaceAuPeuple":0
};

// then we only keep those tweets with attacks, and we keep media out of this.

var PTA=PT.filter(function(t) {return (camp[t.account]>-1) && (t.score.critique>0)});
	
// now we are going to see who are targeted by those attacks.
	
PTA.forEach(function(t) {
	t.attacks=[0,0,0,0,0,0];
	attacks.forEach(function(a) {
		if(!a[camp[t.account+1]]) {
			if ((t.text.toLowerCase()).indexOf(a[0])>-1) {
				d3.range(1,7).forEach(function(i) {
					t.attacks[i-1]=parseFloat(t.attacks[i-1]+a[i])
				;})
			}
		}			
	;})
	// what this means is that if one candidate uses a word which is against his own 
	// group (and possibly others), it's not taken into account, because it won't be used
	// in a negative sense
	
	if(t.attacks[camp[t.account]] && d3.sum(t.attacks)==1) {
		//PT[t.id].score.critique=0;
	}else {
		t.attacks[camp[t.account]]=0;PT[t.id].attacks=t.attacks;
	}
});
	
// now we output everything to screen.

d3.select("body").html("var PT="+JSON.stringify(PT));

