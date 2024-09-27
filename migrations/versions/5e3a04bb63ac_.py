"""empty message

Revision ID: 5e3a04bb63ac
Revises: 75d3b07ef82d
Create Date: 2024-09-27 16:50:30.819968

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e3a04bb63ac'
down_revision = '75d3b07ef82d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=128), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###
