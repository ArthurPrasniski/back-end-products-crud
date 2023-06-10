import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }
    async create(data: ProductDto) {
        try {
            await this.prisma.product.create({
                data
            })
            return { message: 'Product created successfully' };
        } catch (error) {
            if (error) {
                throw new NotFoundException('Error creating product');
            }
        }
    }

    async findAll() {
        return await this.prisma.product.findMany();
    }

    async findOne(id: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: id
                }
            });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            if (error) {
                throw new NotFoundException('Error finding product');
            }
        }

    }

    async update(id: number, data: ProductDto) {
        try {
            await this.prisma.product.update({
                where: {
                    id: id
                },
                data
            });
            return { message: 'Product updated successfully' };
        } catch (error) {
            if (error) {
                throw new NotFoundException('Error updating product');
            }
        }

    }

    async delete(id: number) {
        try {
            const product = await this.prisma.product.delete({
                where: {
                    id: id
                }
            });
            
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            
            return { message: 'Product deleted successfully' };
        } catch (error) {
            if (error) {
                throw new NotFoundException('Error deleting product');
            }
        }
    }
}
