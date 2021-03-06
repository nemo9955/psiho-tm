'''
Created on Dec 21, 2015

@author: Mogoi Adrian
'''


import random
import uuid

import webapp2

from Utils import getJTemplate
from Utils.firebaseWraper import Firebase

motivBun = [
        "Te-ai descurcat excelent.",
        "Ai facut o treaba foarte buna.",
        "Esti un exemplu pentru toti.",
        "Iti merge bine mintea.",
       ]
motivRau = [
            "NOPE !!!!!!!",
]


varfeed = ["none", "good"]

life = 2 * 6 * 60 * 60

pgmp = {
      "titlu":"Chestionar Sudoku",
      }

class Home( webapp2.RequestHandler ):
    def get( self ):
        stat = ""
        if "uid" not in  self.request.cookies or "stat" not in  self.request.cookies :
            self.response.set_cookie( "uid" , str( uuid.uuid4() ) , max_age=life )
            self.response.set_cookie( "stat" , "info" )
#             print "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"#, self.request.cookies , "\n\n"
            stat = "info"
        else:
            stat = self.request.cookies[ "stat" ]
            uid = self.request.cookies[ "uid" ]
            fb = Firebase( "psiho-tm.firebaseio.com/" )


        if  stat == "info"  :
            tem = getJTemplate( "Info.html" )
            self.response.write( tem.render( pgmp ) )

        if stat == "sudoku" :
            tem = getJTemplate( "Sudoku.html" )
            self.response.write( tem.render( pgmp ) )

        if stat == "feedback" :
            if fb.get( str( uid ) + "/feed" ) == '"good"' :
                pgmp["feedback"] = random.choice( motivBun )
            tem = getJTemplate( "Feedback.html" )
            self.response.write( tem.render( pgmp ) )


    def post( self ):
        stat = self.request.cookies[ "stat" ]
        uid = self.request.cookies[ "uid" ]

        fb = Firebase( "psiho-tm.firebaseio.com/" )

        if stat == "info" :
            clase = self.request.get( "clase" )
            exp = self.request.get( "exp" )

            infos = {
                "clase":int( clase, 10 ),
                "exp" :int( exp, 10 ),
                "feed":random.choice( varfeed ),
                "plays":0,
            }
            fb.set( uid , infos )
            self.response.set_cookie( "stat" , "sudoku" )

        if stat == "sudoku" :
            sudok = {
                "start": self.request.get( "start" ),
                "stop" : self.request.get( "stop" ),
                "delta" : self.request.get( "delta" ),
            }

            i = int( fb.get( uid + "/plays" ), 10 ) + 1
            fb.set( uid + "/plays", i )

            fb.set( ( uid + "/" + str( i ) + "/" ), sudok )

            if fb.get( str( uid ) + "/feed" ) == '"none"' :
                self.response.set_cookie( "stat" , "sudoku" )
            else:
                self.response.set_cookie( "stat" , "feedback" )

        if stat == "feedback" :
            self.response.set_cookie( "stat" , "sudoku" )


        self.redirect( "/" )

class NewPlayer( webapp2.RequestHandler ):
    def get( self ):
        self.response.set_cookie( "uid" , str( uuid.uuid4() ) , max_age=life )
        self.response.set_cookie( "stat" , "info" )
        tem = getJTemplate( "Info.html" )
        self.response.write( tem.render( pgmp ) )

app = webapp2.WSGIApplication( [
    ( '/', Home ),
    ( '/new', NewPlayer ),
    ( '/nou', NewPlayer ),
], debug=True )
