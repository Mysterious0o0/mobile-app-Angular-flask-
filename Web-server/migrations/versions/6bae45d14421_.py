"""empty message

Revision ID: 6bae45d14421
Revises: 
Create Date: 2018-12-14 11:09:00.574979

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bae45d14421'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exorder',
    sa.Column('sorderid', sa.String(length=64), nullable=False),
    sa.Column('orderid', sa.String(length=64), nullable=False),
    sa.Column('sellerid', sa.String(length=64), nullable=False),
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('exdesc', sa.String(length=64), nullable=True),
    sa.Column('exrepl', sa.Text(length=128), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.Column('repltime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('sorderid')
    )
    op.create_table('forgetwd',
    sa.Column('forgetpassid', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('isdone', sa.String(length=2), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('forgetpassid')
    )
    op.create_table('goods',
    sa.Column('goodsid', sa.String(length=64), nullable=False),
    sa.Column('menuid', sa.String(length=64), nullable=False),
    sa.Column('sellerid', sa.String(length=64), nullable=False),
    sa.Column('goodsname', sa.String(length=64), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('price', sa.DECIMAL(precision=10, scale=2), nullable=False),
    sa.Column('spic', sa.String(length=64), nullable=False),
    sa.Column('bpic', sa.String(length=64), nullable=False),
    sa.Column('unit', sa.String(length=32), nullable=False),
    sa.Column('online', sa.String(length=2), nullable=True),
    sa.Column('isshow', sa.String(length=2), nullable=True),
    sa.Column('selpoint', sa.Text(length=128), nullable=True),
    sa.Column('delflag', sa.String(length=2), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.Column('updatetime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('goodsid')
    )
    op.create_table('hisorder',
    sa.Column('orderid', sa.String(length=64), nullable=False),
    sa.Column('adderssid', sa.String(length=64), nullable=False),
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('sumtotal', sa.DECIMAL(precision=12, scale=2), nullable=False),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('orderid')
    )
    op.create_table('hissorder',
    sa.Column('sorderid', sa.String(length=64), nullable=False),
    sa.Column('orderid', sa.String(length=64), nullable=False),
    sa.Column('adderssid', sa.String(length=64), nullable=False),
    sa.Column('sellerid', sa.String(length=64), nullable=False),
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('goodsname', sa.String(length=64), nullable=False),
    sa.Column('price', sa.DECIMAL(precision=10, scale=2), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('unit', sa.String(length=32), nullable=False),
    sa.Column('sumunit', sa.DECIMAL(precision=12, scale=2), nullable=False),
    sa.Column('state', sa.String(length=4), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('sorderid')
    )
    op.create_table('item_car',
    sa.Column('sorderid', sa.String(length=64), nullable=False),
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('goodsname', sa.String(length=64), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('price', sa.DECIMAL(precision=10, scale=2), nullable=False),
    sa.Column('unit', sa.String(length=32), nullable=False),
    sa.Column('sumunit', sa.DECIMAL(precision=12, scale=2), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('sorderid')
    )
    op.create_table('menu',
    sa.Column('menuid', sa.String(length=64), nullable=False),
    sa.Column('menuname', sa.String(length=64), nullable=False),
    sa.Column('url', sa.String(length=128), nullable=False),
    sa.Column('menuintr', sa.TEXT(length=128), nullable=True),
    sa.Column('delflag', sa.String(length=2), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('menuid')
    )
    op.create_table('seller',
    sa.Column('sellerid', sa.String(length=64), nullable=False),
    sa.Column('sellername', sa.String(length=64), nullable=False),
    sa.Column('relatetionperson', sa.String(length=32), nullable=False),
    sa.Column('selleraddress', sa.TEXT(length=128), nullable=False),
    sa.Column('sellerphone', sa.String(length=32), nullable=False),
    sa.Column('cardid', sa.String(length=64), nullable=False),
    sa.Column('deliverername', sa.String(length=32), nullable=False),
    sa.Column('delivererphone', sa.String(length=32), nullable=False),
    sa.Column('deliverercard', sa.String(length=64), nullable=False),
    sa.Column('delflag', sa.String(length=2), nullable=False),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('sellerid')
    )
    op.create_table('sorder',
    sa.Column('sorderid', sa.String(length=64), nullable=False),
    sa.Column('orderid', sa.String(length=64), nullable=False),
    sa.Column('adderssid', sa.String(length=64), nullable=False),
    sa.Column('sellerid', sa.String(length=64), nullable=False),
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('goodsname', sa.String(length=64), nullable=False),
    sa.Column('price', sa.DECIMAL(precision=10, scale=2), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('unit', sa.String(length=32), nullable=False),
    sa.Column('sumunit', sa.DECIMAL(precision=12, scale=2), nullable=False),
    sa.Column('state', sa.String(length=4), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('sorderid')
    )
    op.create_table('user',
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=False),
    sa.Column('realname', sa.String(length=64), nullable=True),
    sa.Column('mobile', sa.String(length=32), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.Column('level', sa.String(length=2), nullable=True),
    sa.Column('score', sa.String(length=10), nullable=True),
    sa.Column('role', sa.String(length=2), nullable=True),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('blackflag', sa.String(length=2), nullable=True),
    sa.Column('delflag', sa.String(length=2), nullable=True),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('userid')
    )
    op.create_table('userorder',
    sa.Column('orderid', sa.String(length=64), nullable=False),
    sa.Column('adderssid', sa.String(length=64), nullable=False),
    sa.Column('userid', sa.String(length=64), nullable=False),
    sa.Column('sumtotal', sa.DECIMAL(precision=12, scale=2), nullable=False),
    sa.Column('createtime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('orderid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userorder')
    op.drop_table('user')
    op.drop_table('sorder')
    op.drop_table('seller')
    op.drop_table('menu')
    op.drop_table('item_car')
    op.drop_table('hissorder')
    op.drop_table('hisorder')
    op.drop_table('goods')
    op.drop_table('forgetwd')
    op.drop_table('exorder')
    # ### end Alembic commands ###