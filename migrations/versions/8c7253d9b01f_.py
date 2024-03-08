"""empty message

Revision ID: 8c7253d9b01f
Revises: b75a99ec6f54
Create Date: 2024-03-08 18:33:56.868820

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c7253d9b01f'
down_revision = 'b75a99ec6f54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('modulo', schema=None) as batch_op:
        batch_op.alter_column('contenido_modulo',
               existing_type=sa.VARCHAR(length=2000),
               type_=sa.String(length=5000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('modulo', schema=None) as batch_op:
        batch_op.alter_column('contenido_modulo',
               existing_type=sa.String(length=5000),
               type_=sa.VARCHAR(length=2000),
               existing_nullable=False)

    # ### end Alembic commands ###
