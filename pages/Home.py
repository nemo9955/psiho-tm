'''
Created on Dec 21, 2015

@author: Mogoi Adrian
'''


import webapp2
from Utils import getJTemplate


class Home( webapp2.RequestHandler ):
    def get( self ):
        
        tem = getJTemplate("index.html")
         
        self.response.write(tem.render())


app = webapp2.WSGIApplication( [
    ( '/', Home ),
], debug=True )
