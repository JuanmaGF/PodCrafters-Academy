"""empty message

Revision ID: 71d2046e841b
Revises: 8f1c0bdd194c
Create Date: 2024-03-09 13:07:43.442233

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '71d2046e841b'
down_revision = '8f1c0bdd194c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('telephone',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)
        batch_op.drop_constraint('user_telephone_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_unique_constraint('user_telephone_key', ['telephone'])
        batch_op.alter_column('telephone',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###