## Guida alla configurazione ottimale di git su Cygwin

Vi Mostro in mostro in pochi passaggi come ho configurato Cygwin con git sul mio computer (WIN 8). Ha poco a che fare con i progetti di biomedica, quindi non è un file ufficiale e pertanto non scriverò in inglese.
Se vi state chiedendo perchè non mi basti la git-bash la risposta è [questa](http://www.memecreator.org/static/images/memes/1195026.jpg).

1) Scaricare [da qui](http://cygwin.com/mirrors.html) l'eseguibile selezionando preferibilmente il sito del garr su http:

    Italy: bo.mirror.garr.it(ftp), bo.mirror.garr.it(http)
                                  ^^^^^^^^^^^^^^^^^^^^^^^^
                                  
2) Lanciate l'installazione e seguite i passaggi di default fino a quando non dovrete scegliere il server da cui scaricare per poi selezionare i pacchetti da installare.

  * Ovviamente selezionate ancora una volta il server del garr (sempre su http, su ftp a me non ha funzionato)

3) Selezionato il server dovrete selezionare i pacchetti da installare. Selezionate tramite la barra di ricerca:

  * nano
  * tutti i pacchetti ssh (openssh)
  * git (nel package devel-qualcosa, io ho selezionato l'intero package)
  * python, perl, interpreti vari... fate voi, spizzatevi cosa vi possa servire.

4) Lasciate soffriggere a fuoco basso per 15 minuti, successivamente aprite la shell e date il comando `which ssh` e `which git`. Dovreste avere un output del genere che deve (dovrebbe ^^") essere diverso dalla git-bash (se precedentemente installata)

    /usr/bin/ssh
    /usr/bin/git
    
5) Ok adesso la vostra HOME in Cygwin se non l'avete settata tra le variabili di Windows (verificare con `set HOME` dal prompt) dovrebbe essere

    $ echo $HOME
    /home/vostroNomeUtente
    
* se invece la HOME è già la stessa di windows, create lì il file `.bashrc` e aggiungete ` . "$HOME/.bashrc"` nel file `cygwin64/etc/profile`.

Adesso la parte davvero interessante. Spostiamo la home nella classica cartella /Users/vostronomeUtente di windows e potenziamo per bene la shell, quindi:

    # NO COPIA E INCOLLA SELVAGGIO
    # Modificate i comandi con il vostro nome utente
    
    cd /cygdrive/c/Users/vostroNomeUtente
    
    # Per avere bashrc e gli altri file di configurazione a portata di mano
    ln -s /home/vostroNomeUtente cygwin_home
    
    # Per visualizzare i branch come nella git-bash (occhio se avete la versione a 32 bit)
    # lo copiamo nella home di cygwin così successivamente faremo 'source $CYGWIN_HOME/.git-completion.sh'
    cp /cygdrive/c/cygwin64/etc/bash_completion.d/git /home/vostroNomeUtente/.git-completion.sh

    # Questo se volete utilizzare lo stesso .bashrc anche per la git-bash
    # in caso aggiungerete alias di programmi
    ln -s /cygdrive/c/ /c

    
poi modifichiamo .bashrc con nano `nano .bashrc` e in fondo aggiungiamo (scorrere con pag-giù, e incollate con il "Paste" del tasto dentro, bello cygwin vero?):

    export HOME=/cygdrive/c/Users/vostroNomeUtente
    export CYGWIN_HOME=/home/vostroNomeUtente
    alias ll='ls -alF'
    # inutile :P
    alias open='explorer.exe .'

    # Per chi ha sublime a 64 bit, altrimenti: Program\ Files\ \(x86\)/
    alias sublime='/c/Program\ Files/Sublime\ Text\ 2/sublime_text.exe'

    # Questi alias sono già presenti nel file, basterebbe scommentarli
    alias grep='grep --color'                     
    alias egrep='egrep --color=auto'              
    alias fgrep='fgrep --color=auto'              
    alias ls='ls -hF --color=tty'                 
    alias dir='ls --color=auto --format=vertical'
    alias vdir='ls --color=auto --format=long'
    alias la='ls -A'                            
    alias l='ls -CF'
    
    # il comando magico per visualizzare i branch git-bash style
    source $CYGWIN_HOME/.git-completion.sh
    PS1='\[\e]0;\w\a\]\n\[\e[32m\]\u@\h \[\e[33m\]\w\[\e[0m\]$(__git_ps1 " (%s)")\n\$ '

    # Fondamentale per chi non ha la HOME settata
    cd

Per salvare `Ctrl+O` per chiudere `Ctrl+X`.

6) Riavviate la bash, correggete gli errori, e se avrete fatto tutto bene potrete entrare in un repository e vedere tra parentesi la branch attuale.
  * Se avrete un errore relativo a __git_ps1 c'è qualche problema con questo comando qui
    `cp /cygdrive/c/cygwin64/etc/bash_completion.d/git /home/vostroNomeUtente/.git-completion.sh`

**Prendete questa guida come spunto e non come verità assoluta, potrei essermi dimenticato qualche cosa di fondamentale, tra questi l'italiano.**
