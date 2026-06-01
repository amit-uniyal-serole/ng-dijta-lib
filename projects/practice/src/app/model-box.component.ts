import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    template: `
        <h2 mat-dialog-title>Hi {{data.name}}</h2>
        <mat-dialog-content>
            <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Dui platea mi platea eu, sagittis nulla inceptos metus. Praesent tristique viverra, nullam per sit consectetur. Parturient dolor lacus velit commodo ultricies. Sem porta donec curae ullamcorper curae commodo erat feugiat. Facilisis vulputate mattis fringilla quam morbi inceptos ornare taciti. Montes etiam metus penatibus tincidunt curae curabitur mattis rutrum.

Magnis mollis est nisl litora torquent ornare lacus. Nisl lobortis egestas id tortor sem mus semper porta. Class eget lectus pulvinar risus dolor. Risus elit ac quisque scelerisque laoreet sed taciti. Congue mauris nunc proin nibh fames senectus quis. Consectetur praesent amet non natoque lacus viverra mollis interdum. Ipsum sit lectus sed ad maximus. Odio massa nec; sem maximus ornare curabitur.

Velit velit etiam ligula orci suscipit. Penatibus ultrices volutpat id nam est magna orci. Nam torquent finibus enim; morbi hendrerit mus posuere. Volutpat vitae cras auctor quisque tempor fames. Molestie montes eget tortor, dis interdum gravida. Ut fames ornare curabitur urna consequat litora laoreet accumsan. Sagittis posuere elementum est pellentesque scelerisque phasellus aliquam pretium diam. Habitasse ad luctus felis varius aliquam iaculis penatibus cubilia.

Mollis interdum mi sollicitudin iaculis maecenas porttitor. Est sapien varius vehicula aliquet ridiculus per ultrices hendrerit ullamcorper. Orci imperdiet sit feugiat arcu molestie cubilia lacus mus purus? Ex etiam maximus mauris scelerisque per fermentum. Aptent mauris hac mus consequat lacus sit. Dis est turpis efficitur dignissim malesuada iaculis. Congue nam consectetur efficitur vel nostra rhoncus ridiculus sed. Finibus morbi metus commodo condimentum etiam venenatis. Fames potenti dignissim ut mus sapien venenatis molestie ultrices.

Curae nisi in dignissim tellus porttitor iaculis suspendisse litora. Imperdiet imperdiet parturient ridiculus amet ante placerat. Accumsan parturient senectus per neque donec quam. Massa etiam mattis volutpat platea id torquent. At dictum tincidunt dignissim natoque aenean dignissim rutrum. Iaculis a etiam orci facilisis; in hendrerit. Integer taciti mus eleifend pellentesque suscipit tincidunt duis. Ad vivamus ornare vivamus egestas amet. Sociosqu purus praesent adipiscing non; aptent euismod class.

Parturient aenean posuere dictumst integer sollicitudin dis suscipit consequat interdum. Pretium varius blandit tempus vel, at velit tincidunt. Aliquet gravida orci scelerisque potenti parturient tempor. Et est condimentum proin commodo feugiat neque ultricies. Vel justo tortor tincidunt consectetur dignissim; odio nullam aenean. Condimentum mi dignissim molestie penatibus duis hendrerit maximus integer. Ante potenti natoque urna egestas sed euismod maximus amet.

Cursus nisl suspendisse suspendisse pellentesque suscipit nisi. Sagittis gravida id vestibulum; vehicula dis conubia proin nibh. Nullam magnis pretium sagittis dictum vehicula, odio netus posuere. Facilisis iaculis senectus consectetur egestas senectus. Aliquet luctus nisl consequat luctus sodales semper ante natoque scelerisque. Etiam eget odio torquent nascetur netus ultricies. Platea pellentesque laoreet odio lorem fringilla ornare leo commodo ultrices. Gravida feugiat posuere euismod malesuada euismod mi. Nibh quam class lobortis aliquam est.

Mus tincidunt faucibus curabitur nec libero suscipit class montes. Sollicitudin auctor duis consectetur ornare diam nisi in. Suspendisse tincidunt tortor gravida; lacus tristique scelerisque eros. Diam laoreet lectus feugiat penatibus fusce mollis. Nascetur duis phasellus adipiscing sodales interdum fringilla. Cursus curabitur erat tristique vehicula eleifend pulvinar nisi. Et tincidunt erat pellentesque mus sodales felis congue aenean.

Potenti gravida cras dui varius dolor aenean risus cursus platea. Lobortis ac phasellus felis ullamcorper purus, volutpat leo dui vivamus. Vel rhoncus parturient velit quis blandit tincidunt suspendisse class finibus. Consectetur mattis curabitur ullamcorper dolor bibendum nam. Porttitor sagittis tempus ultrices curae duis. Metus enim nunc porta libero orci dapibus convallis vulputate posuere. Bibendum vel curabitur vulputate maecenas quisque class. Sagittis imperdiet eget vestibulum curabitur rhoncus sodales aenean. Vehicula iaculis non urna vehicula sem, vivamus volutpat tortor.

Penatibus quis fringilla hendrerit et facilisi. Aptent sociosqu eleifend ullamcorper velit litora vitae taciti ante quis. Lobortis primis luctus platea molestie himenaeos potenti augue at. Ante mollis feugiat turpis; mus eros mollis litora. Posuere fringilla sollicitudin maximus, elementum venenatis iaculis. Aptent sem nam nibh urna ac ornare aliquet vehicula. Elit litora finibus id lacinia; metus auctor nisl habitasse iaculis. Leo montes malesuada lobortis lobortis tortor leo ullamcorper.

Consequat hac suscipit sodales phasellus ultrices sociosqu velit parturient. Ut dolor vestibulum mollis sociosqu vestibulum. Sodales quis sem metus gravida commodo nisl. Lacinia tempus natoque torquent sollicitudin suspendisse rutrum. Penatibus rutrum eu tincidunt vestibulum maecenas varius porta tincidunt bibendum. Nullam nullam magnis porta platea magna nulla dapibus mi. Orci sollicitudin dui habitant sed scelerisque scelerisque blandit efficitur.

Vestibulum cubilia venenatis purus in condimentum torquent velit sit facilisi. Luctus euismod quis ligula parturient dapibus eros in, litora ad. Potenti scelerisque cursus inceptos quis nostra laoreet dolor maximus. Per fermentum fermentum eros fringilla non porttitor inceptos ridiculus venenatis. Euismod natoque platea eleifend quisque morbi et hendrerit tellus. Tempus cras mattis accumsan taciti ullamcorper. Integer fusce mus hac, malesuada diam tempor. Cras inceptos nostra turpis congue malesuada odio. Nunc convallis ultrices dignissim a laoreet inceptos ac. Vehicula eros dis odio aliquet egestas dis maecenas class.

Molestie ac justo ut porttitor ullamcorper dui. Augue cras interdum eleifend est tristique tempus primis. Velit curabitur quam aliquam quam porta ac taciti vivamus. Lacus imperdiet volutpat himenaeos ridiculus et ex habitant purus lacus. Natoque malesuada netus sapien commodo faucibus viverra. Facilisi ex pharetra class hendrerit amet senectus rhoncus diam? Tortor ante pellentesque vel quisque dictum aliquet? Euismod diam dignissim feugiat donec litora per non convallis. Posuere maecenas sed ligula leo praesent tortor.

Consectetur sodales himenaeos nunc risus non tristique aliquet primis platea! Dolor euismod efficitur sem neque per inceptos erat sollicitudin sapien. Ornare ad mauris netus mi natoque laoreet malesuada aenean aliquam. Mus porta netus nec magnis pellentesque. Placerat feugiat volutpat semper primis velit est ipsum praesent gravida. Montes habitasse est luctus diam nibh ultricies tellus dis conubia.

Feugiat tellus lectus inceptos mi orci mattis. Magnis convallis ad dis sapien mauris. Nunc nec felis nibh turpis venenatis efficitur netus nostra. Ut metus bibendum pellentesque finibus aliquet amet dapibus? Cursus hendrerit elementum velit; eros porta lacus metus class fames. Nec laoreet litora finibus tellus diam malesuada vel donec. Ornare montes viverra aptent ultrices tempor consectetur risus varius taciti. Nascetur arcu netus porttitor fames auctor.

Habitasse et vivamus consequat; sollicitudin primis accumsan. Class nulla conubia torquent, viverra urna interdum. Metus convallis venenatis amet condimentum elit aenean cubilia. Potenti consequat curabitur tortor at volutpat. Ante fusce eleifend iaculis ipsum consequat curabitur. Ultricies cursus diam fames pellentesque dignissim vehicula platea.

Condimentum conubia ac rutrum molestie erat mattis nam dictum. Ex faucibus efficitur tortor consectetur eros vel senectus. Ad pretium dui nulla faucibus nisi habitant parturient. Torquent fusce laoreet est vehicula elit torquent. Vivamus quisque suspendisse quam varius nulla nulla at mus. Elementum erat hac facilisi, platea proin felis magna. Suspendisse suspendisse viverra auctor habitant, diam mollis. Congue viverra aliquam velit ridiculus varius varius. Aptent risus dictum sollicitudin; purus lacus nisi.

Habitant netus pulvinar blandit vivamus eleifend. Finibus ligula suscipit magna massa dignissim porttitor ultrices bibendum per. Ullamcorper tincidunt vitae non penatibus parturient maximus. Viverra tortor pulvinar risus facilisis donec cubilia venenatis. Et facilisi purus libero fermentum amet convallis. Cubilia nunc vehicula, libero non facilisis arcu magna. Faucibus cursus justo eget sapien conubia sollicitudin quam. Placerat senectus vivamus habitant vestibulum dignissim phasellus vestibulum. Diam nec mollis, ligula blandit dis natoque ullamcorper.

Mauris leo in nascetur integer ullamcorper fusce. Elementum orci parturient rhoncus id cursus taciti; vel auctor. Leo libero tellus sapien pretium, dignissim gravida. Vestibulum fringilla tincidunt class tincidunt amet odio habitant etiam. Ut nisi imperdiet pulvinar massa ridiculus congue euismod. Vel dictum ornare nullam augue felis massa. Varius potenti rutrum ornare inceptos metus pharetra.

Himenaeos massa at nec facilisi vivamus dictum. Nibh ac ipsum bibendum volutpat vestibulum vulputate blandit rutrum. Bibendum nulla mus habitasse per amet parturient placerat. Imperdiet suspendisse at consectetur quam vestibulum nostra class. Libero cras scelerisque commodo blandit quis. Ligula mauris proin adipiscing quis suscipit volutpat cubilia cursus ad. Ut nunc scelerisque sapien vivamus tempus tortor ridiculus ut. Fermentum nibh accumsan sociosqu ultrices posuere. Vel pretium pulvinar vel ipsum inceptos diam mus.

Tortor quam mollis maximus ridiculus posuere integer risus. Dapibus platea tellus ullamcorper non interdum turpis. Rhoncus cubilia neque bibendum consequat aptent. Mus nisl justo est finibus aenean arcu aliquam. Sociosqu arcu vestibulum rhoncus sed feugiat lacinia. Tempus aptent curae nec ante; ad neque ad. Nascetur tortor curae ridiculus, ridiculus placerat duis. Vivamus himenaeos aliquam vel posuere venenatis sodales blandit. Risus erat inceptos litora phasellus eu gravida.

Laoreet viverra pellentesque enim ullamcorper eget laoreet. Ullamcorper felis himenaeos accumsan porta nam mauris tellus imperdiet etiam. Quisque donec quam ridiculus eros curae ultrices vestibulum tellus urna. Suspendisse auctor convallis porta conubia suspendisse finibus vitae ullamcorper neque. Aliquam vehicula scelerisque aliquet, vestibulum vehicula pharetra urna urna. Erat at mattis tempor sed duis. Sollicitudin maecenas augue metus mi pellentesque? Quisque dui faucibus eros fringilla ex sagittis curabitur. Maecenas fermentum elit iaculis malesuada quisque, ultrices nostra condimentum.

Ullamcorper ipsum adipiscing auctor blandit per posuere finibus accumsan sodales. Auctor vehicula sodales euismod sollicitudin mattis sociosqu platea neque. Tortor volutpat sollicitudin nostra donec; at posuere vestibulum. Fringilla eget id posuere rutrum maecenas vehicula. Vivamus ultricies eu nec dolor himenaeos erat. Finibus ullamcorper sapien gravida risus scelerisque tristique consectetur fermentum. Hendrerit magna phasellus cursus netus auctor sodales magnis ut. Taciti magna tempus tellus finibus odio lorem posuere. Praesent nam nec pulvinar praesent torquent facilisi, nec sagittis mus.

Montes finibus condimentum porttitor nisl dui ut. Convallis sapien ultricies lacinia tristique tincidunt leo. Justo viverra pharetra nibh fames tellus augue; semper ridiculus. Hendrerit metus neque rutrum fermentum parturient vulputate augue tristique. Cubilia porttitor libero dignissim integer fames vehicula mi. Non risus sapien nulla suscipit ex. Finibus maximus conubia maximus feugiat odio volutpat. Nunc metus eros tempor amet accumsan diam potenti.

Mi interdum luctus, proin habitant volutpat eros a. Commodo vitae maecenas proin egestas aptent pellentesque. Arcu varius habitant, placerat ultrices elit volutpat turpis malesuada congue. Nullam senectus luctus integer velit, egestas platea himenaeos vehicula. Potenti elementum per, pretium praesent eget dignissim. Nisi vel curae elementum iaculis volutpat torquent orci. Mus curae est risus cursus potenti sollicitudin.

Pellentesque molestie lorem torquent netus aliquam enim. Litora dictum dictum integer imperdiet himenaeos quam phasellus. Consectetur platea vivamus ullamcorper mattis fusce porttitor. Nisl pulvinar tellus arcu tempor tempor aenean. Augue rhoncus senectus volutpat, aenean semper facilisi varius. Id magnis dapibus dolor porta; rutrum vitae facilisi. Quis lacus pretium nostra conubia mauris; tempus ligula. Nec tellus sodales rhoncus primis nec cubilia. Conubia arcu facilisis eget ut platea lacus.

Montes hendrerit habitant est vulputate senectus fusce. Ultricies vel pulvinar ipsum magna; porta natoque. Posuere fermentum ex viverra nibh hac sociosqu nulla nisl. Feugiat mauris ornare aliquet non semper enim facilisi blandit. Elit maximus morbi massa lobortis posuere nascetur. Lacus pulvinar luctus cubilia lobortis adipiscing ultrices cubilia. Euismod suspendisse lacinia eget justo habitant justo per nullam. Adapibus ullamcorper gravida ac natoque.

Vivamus natoque auctor ullamcorper consequat augue. Posuere imperdiet magna cubilia in euismod. Cras nullam potenti augue tempor; metus est non. Blandit posuere litora vivamus eros eget id sociosqu auctor pharetra. Elit et posuere turpis; quisque eleifend laoreet tellus. Augue ornare duis curae commodo mus. Mauris adipiscing aptent nisi laoreet scelerisque.

Fermentum consectetur ligula sit penatibus proin pulvinar penatibus. Tellus pulvinar ligula ac litora penatibus. Aliquam aptent mattis lorem dolor elementum inceptos. Hac nisl id habitasse etiam praesent. Vulputate etiam dictum posuere felis adipiscing. Sem ornare luctus curabitur ligula massa netus montes euismod. Torquent feugiat nisl habitant leo consectetur risus.

Diam nulla condimentum vel sapien primis? At morbi torquent aliquet; ridiculus eleifend himenaeos. Felis lectus volutpat mollis molestie ultrices egestas facilisis hac. Feugiat nam morbi aptent primis ullamcorper purus convallis. Cursus egestas ipsum turpis amet bibendum ultrices turpis augue molestie. Fusce bibendum penatibus turpis porta cursus morbi. Natoque tempor neque habitant duis turpis. Nascetur orci maecenas parturient adipiscing sit facilisi neque consequat.

Netus aptent aptent dapibus odio dolor etiam montes aliquet. Gravida velit ultrices justo dis rhoncus lacus hac nec. Phasellus egestas blandit aliquam commodo pharetra hendrerit facilisi. Himenaeos pulvinar netus purus sit felis ligula nascetur nisl semper. Orci blandit primis vulputate vulputate parturient elementum est iaculis vulputate. Vitae viverra imperdiet viverra scelerisque volutpat penatibus lacus. Molestie aliquet tortor quam rutrum phasellus.

Risus ridiculus non, mi mollis felis eget tortor. Himenaeos volutpat phasellus integer porta quis rutrum porttitor? Quisque donec placerat; nibh fames eget dictum cras arcu ex. Dapibus arcu arcu inceptos cursus iaculis suspendisse. Fringilla dapibus tincidunt vitae adipiscing adipiscing lectus pellentesque. Cubilia purus mus placerat lectus tellus non nam penatibus. Quam senectus elit nisl urna in lectus. Vehicula placerat nascetur; montes litora suspendisse dapibus mollis enim nisi. Dis placerat platea pulvinar dictum praesent tortor? Aptent platea magna euismod massa porta fringilla fusce lobortis.

Nec lacinia at penatibus eget per tempor porttitor bibendum. Venenatis morbi enim pretium sapien lectus arcu sociosqu fames morbi. Laoreet diam tristique massa nunc mi pellentesque quisque potenti. Magnis pellentesque hendrerit nibh maecenas tempor malesuada nibh. Accumsan sem sagittis nascetur malesuada metus facilisis. Tempus aenean hac est dui consequat in turpis elementum vulputate. Tempus taciti facilisi pretium neque lobortis curabitur donec. Dignissim adipiscing nascetur est cubilia quam sagittis augue quisque. Curae tincidunt curabitur habitant nisi gravida volutpat.

Placerat nulla phasellus luctus a sit eleifend mollis et. Scelerisque tellus condimentum neque parturient penatibus. Morbi ornare luctus; penatibus dictum tristique penatibus porta. Turpis nam erat quam a finibus fermentum adipiscing varius. Consectetur semper porta natoque dui pretium amet. Magnis tincidunt nisl vivamus eleifend blandit suscipit parturient. Lorem morbi ex ultrices; cursus semper hendrerit varius maecenas. Maximus accumsan ligula luctus facilisi sapien metus eros ac. Sollicitudin varius diam dapibus placerat tortor senectus.

Sem malesuada eleifend nostra hac nulla tortor; aenean fringilla. Faucibus primis euismod dolor senectus phasellus. Quisque convallis litora habitasse lectus mus a. Volutpat curabitur pharetra praesent tellus iaculis magna iaculis. Quam nullam ultrices facilisi, taciti turpis at cubilia. Erat id suscipit efficitur eu; natoque turpis vitae hac. Integer feugiat class nam eu arcu.

Volutpat mattis auctor varius torquent et scelerisque, quam diam. Tempor sem parturient iaculis maximus lacus semper nostra quisque tellus. Class at donec fames litora fames montes. Congue interdum mi sapien sodales nam ante mauris. Lacinia auctor egestas felis ornare facilisi semper. Mi diam quisque sed inceptos dictumst hac primis id. Nisl tempor finibus tempus molestie platea; etiam magna quis? Morbi sed volutpat consectetur porta proin iaculis litora platea enim.

Gravida libero in donec ante donec natoque nunc. Hendrerit porttitor platea auctor mauris mi congue. Non nostra dis malesuada proin sapien nibh. Neque tempor montes facilisis conubia feugiat vestibulum blandit litora. Placerat vivamus eleifend primis magna conubia finibus lacus eros. Vitae euismod iaculis dui sem, rhoncus conubia. Tristique varius quis vestibulum augue lacinia velit. Egestas tellus class nibh hac sociosqu dui sed.

Phasellus congue penatibus vulputate curabitur tortor proin semper etiam habitasse. Ascelerisque adipiscing mattis ornare luctus. Netus vestibulum ad fusce pharetra fames erat vestibulum. Rhoncus dictumst metus arcu mi curabitur. Aenean volutpat iaculis efficitur vestibulum metus porta platea etiam. Orci dapibus tellus tellus dapibus neque dui viverra volutpat. Fermentum velit proin rhoncus tellus orci id.

Ac curabitur sociosqu himenaeos egestas velit inceptos tincidunt posuere. Dictumst convallis morbi suscipit consectetur lacinia vehicula vestibulum. Vel rhoncus a aenean vulputate faucibus torquent pellentesque? Justo vivamus proin primis hendrerit ultricies viverra sociosqu. Congue eros mi porttitor ridiculus facilisis praesent placerat. Justo potenti penatibus phasellus; ante placerat class justo. Phasellus taciti orci taciti odio finibus!

Tristique lobortis duis at odio penatibus sit dui. Bibendum blandit ac, nunc nibh erat metus. Accumsan proin massa cubilia tempus, est mattis ligula. Blandit gravida eu scelerisque mus integer molestie. Purus fringilla ante facilisi sollicitudin vitae. Natoque id ornare elementum nam consectetur elementum vulputate consequat. Sed risus a quisque felis, accumsan ex magnis. Dolor sem interdum metus scelerisque condimentum, aliquet nec. Scelerisque nunc quis donec lacinia odio justo augue porta taciti.

Proin maximus felis hendrerit velit parturient. Nostra placerat nunc quis taciti imperdiet class massa varius venenatis. Mus cubilia ac vitae consectetur platea; imperdiet mus massa sapien. Blandit class hac, integer tempus mus neque praesent nisl ultricies. Pulvinar lectus lacinia non lacinia ornare. Porttitor interdum sollicitudin porta nostra vulputate, torquent turpis. Sagittis tortor elit lectus suscipit class.

Mauris velit cubilia tempor leo pulvinar. Urna integer condimentum dui nullam lectus integer? Dui tellus conubia duis nec vestibulum amet netus. Elementum aenean placerat integer et quam. Venenatis consectetur in dui interdum adipiscing. Proin quam efficitur tristique suscipit; neque vel quisque. Tempus primis pretium volutpat tortor, placerat ullamcorper sodales cubilia ultrices. Nostra suscipit erat dolor suspendisse quam.

Sed nibh rutrum malesuada duis eget himenaeos justo. Porttitor faucibus eros proin neque class taciti pulvinar. Aaliquet tellus venenatis arcu id ridiculus imperdiet potenti fames. Taciti vestibulum ipsum cursus ac porta habitasse cras. Dictum aptent fringilla porttitor duis himenaeos libero semper. Ipsum pretium aliquet nascetur inceptos elementum. Risus dapibus eget in dis a primis viverra enim. Urna eget penatibus consequat vestibulum curae vehicula. Massa imperdiet nibh senectus magnis; proin dolor proin sollicitudin. Orci tortor lobortis ullamcorper habitasse tempor sem.

Primis arcu nec id lorem; eu hac. Pellentesque magnis sodales pharetra interdum libero mus suscipit. Urna libero massa cras posuere molestie. Ipsum scelerisque gravida, aliquet consequat tellus tempor posuere. Amet risus porttitor semper urna efficitur tortor cras mi. Mus efficitur etiam maximus venenatis mauris. Sem parturient praesent auctor gravida amet libero.

Tempus sed nulla interdum orci porta mi enim. Dolor inceptos diam convallis gravida mi. Primis dapibus leo conubia facilisi justo tincidunt. Accumsan nec convallis varius adipiscing lobortis sit. Mus velit habitant aptent vestibulum aliquet aliquam at commodo. Metus platea habitant efficitur, sodales pretium mollis habitant. Ad imperdiet mi fames orci felis curae odio eu.

Vehicula luctus litora placerat posuere suscipit. Congue nunc potenti sodales nisl curabitur facilisis erat? Enim amet metus feugiat lectus interdum turpis platea sodales eu. Integer euismod convallis urna, mus per varius. Ac in gravida at montes aenean laoreet. Eleifend feugiat fringilla nisi euismod, vitae dis. Volutpat morbi litora fermentum fermentum placerat mollis mattis et. Aliquam vitae turpis nibh vivamus nam luctus vel. Condimentum habitasse parturient massa dictum aliquet hendrerit mauris mus.

Adipiscing lacinia ultrices senectus fringilla mauris. Auctor nunc ligula duis venenatis rhoncus. Metus dis ante tellus augue montes porttitor in. Curabitur himenaeos fusce donec, libero urna commodo pharetra habitant. Fames aliquam nullam finibus sollicitudin, praesent lacus parturient. Sagittis proin eu phasellus quisque curae auctor id class. Consectetur ex suspendisse vel ac himenaeos vitae. Vel aliquam himenaeos pretium; hac eget elementum arcu. Dapibus netus ex faucibus placerat sed.

Vitae eu maximus senectus ad porta massa pharetra. Tincidunt ut aenean amet ultricies cursus. Eros metus parturient habitasse adipiscing ligula vitae duis. Imperdiet rhoncus quisque tellus porta nisl. Congue scelerisque inceptos tortor ultricies nascetur non lacus. Himenaeos vel laoreet aliquam parturient metus.

Erat porta facilisi ad facilisi semper orci dignissim? Diam mi suspendisse torquent mattis dignissim pharetra netus. Torquent vitae potenti suspendisse, maximus urna sed. Urna maximus sodales dictum vivamus ridiculus efficitur morbi. Justo egestas interdum neque magnis lectus convallis libero volutpat. Morbi fringilla tristique quisque rhoncus cursus sagittis. Facilisi est volutpat faucibus eros quisque. Phasellus senectus massa turpis curae platea leo massa himenaeos.

Purus cubilia maecenas porta aliquet fusce. Erat rutrum taciti pellentesque varius ultrices elit fermentum commodo? Diam nunc sit fames rhoncus interdum. Tincidunt ligula feugiat integer, efficitur sem natoque. Fames nulla vestibulum quis; iaculis maximus torquent? Ligula dui per class donec sem nulla. Sit tortor integer molestie nisi augue magnis malesuada.
            </p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button>No Thanks</button>
            <button mat-button cdkFocusInitial>Ok</button>
        </mat-dialog-actions>

    `,
    standalone: true,
    imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class ModelBoxComponent {
    animal
    data = {
        name: 'Hi'
    };
}