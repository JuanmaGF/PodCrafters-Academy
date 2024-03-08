"""empty message

Revision ID: 5e66eac8992c
Revises: d47e626ba616
Create Date: 2024-03-08 11:47:45.938443

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e66eac8992c'
down_revision = 'd47e626ba616'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('modulo', schema=None) as batch_op:
        batch_op.alter_column('contenido_modulo',
               existing_type=sa.VARCHAR(length=500),
               type_=sa.String(length=1000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('modulo', schema=None) as batch_op:
        batch_op.alter_column('contenido_modulo',
               existing_type=sa.String(length=1000),
               type_=sa.VARCHAR(length=500),
               existing_nullable=False)

    # ### end Alembic commands ###
