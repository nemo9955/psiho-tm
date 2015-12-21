'''
Created on Dec 21, 2015

@author: Mogoi Adrian
'''

import webapp2


class Sudoku( webapp2.RequestHandler ):
    def get( self ):
        self.response.write( "Sudoku" )


app = webapp2.WSGIApplication( [
    ( '/', Sudoku ),
], debug=True )
