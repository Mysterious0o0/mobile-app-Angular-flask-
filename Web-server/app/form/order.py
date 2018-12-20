from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class AddressForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(1, 18)])
    mobile = StringField('mobile', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])

