'''
Created on Dec 21, 2015

@author: Mogoi Adrian
'''
import os
import jinja2

_templates = "/templates/"

Jinja = jinja2.Environment( 
    loader=jinja2.FileSystemLoader( os.path.join( os.path.dirname( __file__ ), os.pardir ) ),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True )

def getJTemplate( page ):
    return Jinja.get_template( _templates + page )

